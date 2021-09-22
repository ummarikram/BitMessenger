
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that sending & recieving works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let wallet_1 = accounts.get('wallet_1')!;
        let block = chain.mineBlock([
            Tx.contractCall('Messenger', 'get-messages', [types.ascii("ummar"), types.ascii("ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'send-message', [types.ascii("ummar"), types.ascii("ahmed"), types.ascii("Hello Ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'send-friend-request', [types.ascii("ummar"), types.ascii("ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'get-frends-list', [types.ascii("ummar")], wallet_1.address),
            Tx.contractCall('Messenger', 'get-friends-list', [types.ascii("ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'get-pending-friend-requests', [types.ascii("ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'accept-friend-request', [types.ascii("ummar"), types.ascii("ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'get-friends-list', [types.ascii("ummar")], wallet_1.address),
            Tx.contractCall('Messenger', 'get-friends-list', [types.ascii("ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'send-message', [types.ascii("ummar"), types.ascii("ahmed"), types.ascii("Hello Ahmed")], wallet_1.address),
            Tx.contractCall('Messenger', 'get-messages', [types.ascii("ummar"), types.ascii("ahmed")], wallet_1.address),
        ]);

        assertEquals(block.receipts.length, 11);
        assertEquals(block.height, 2);
        
    
        block.receipts[0].result
        .expectList()

        block.receipts[1].result
        .expectErr()
        .expectBool(false)

        block.receipts[2].result
        .expectOk()
        .expectBool(true)

        block.receipts[3].result
        .expectList()

        block.receipts[4].result
        .expectList()

        block.receipts[5].result
        .expectList()

        block.receipts[6].result
        .expectOk()
        .expectBool(true)

        block.receipts[7].result
        .expectList()

        block.receipts[8].result
        .expectList()

        block.receipts[9].result
        .expectOk()
        .expectBool(true)

        block.receipts[10].result
        .expectList()


    },
});
