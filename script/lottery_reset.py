import os
import modal

web3_image = modal.Image.debian_slim().pip_install("web3")

stub = modal.Stub("lottery reset")

if stub.is_inside():
    from web3 import Web3

def connect():
    private_key = os.environ.get("PRIVATE_KEY")
    assert private_key is not None, "You must set PRIVATE_KEY environment variable"
    # assert private_key.startswith("0x"), "Private key must start with 0x hex prefix"

    web3 = Web3(Web3.HTTPProvider("https://base-goerli.publicnode.com"))

    # Verify if the connection is successful
    if web3.is_connected():
        print("-" * 50)
        print("Connection Successful")
        print("-" * 50)
    else:
        print("Connection Failed")
        raise Exception("Connection Failed")

    wallet = web3.eth.account.from_key(private_key)

    return web3, wallet, private_key

def get_contract(web3):
    abi = [
    {
            "inputs": [],
            "name": "resetRound",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    contract_address = '0x76a79FB5b9B236747CCDCc2B225B96A737613890'

    return web3.eth.contract(address=contract_address, abi=abi)

@stub.function(
    image=web3_image,
    schedule=modal.Period(days=3),
    retries=modal.Retries(
        max_retries=3,
        backoff_coefficient=2.0,
        initial_delay=3.0,
    ),
    secret=modal.Secret.from_name("lottery-secrets"))
def reset_round():
    web3, wallet, private_key = connect()
    lottery_contract = get_contract(web3)

    try:
        # Call your function
        call_function = lottery_contract.functions.resetRound().build_transaction({
            "from": wallet.address,
            "nonce": web3.eth.get_transaction_count(wallet.address),
        })

        # Sign transaction
        signed_tx = web3.eth.account.sign_transaction(call_function, private_key=private_key)

        # Send transaction
        send_tx = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

        # Wait for transaction receipt
        web3.eth.wait_for_transaction_receipt(send_tx)

        print('resetRound() transaction confirmed:', web3.to_hex(web3.keccak(signed_tx.rawTransaction)))
    except Exception as error:
        print('Error calling resetRound():', error)
        raise(error)
