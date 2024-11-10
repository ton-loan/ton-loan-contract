import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TonLoanContract } from '../wrappers/TonLoanContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TonLoanContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TonLoanContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonLoanContract: SandboxContract<TonLoanContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonLoanContract = blockchain.openContract(TonLoanContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tonLoanContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonLoanContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonLoanContract are ready to use
    });
});
