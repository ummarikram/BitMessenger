
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that sending & recieving works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let wallet_1 = accounts.get('wallet_1')!;
        let block = chain.mineBlock([
            
            Tx.contractCall('Messenger', 'send-message', [types.ascii("ummar"), types.ascii("ahmed"), types.ascii("Hello Ahmed"), types.ascii("12:25")], wallet_1.address),
            Tx.contractCall('Messenger', 'send-message', [types.ascii("ummar"), types.ascii("ahmed"), types.ascii("How are you?"), types.ascii("12:35")], wallet_1.address),
            Tx.contractCall('Messenger', 'send-message', [types.ascii("ummar"), types.ascii("ahmed"), types.ascii("Whats up?"), types.ascii("12:45")], wallet_1.address),
        ]);

        assertEquals(block.receipts.length, 11);
        assertEquals(block.height, 2);
        
    
        block.receipts[0].result
        .expectOk()
        .expectBool(true)

        block.receipts[1].result
        .expectOk()
        .expectBool(true)


        block.receipts[2].result
        .expectOk()
        .expectBool(true)

    },
});
