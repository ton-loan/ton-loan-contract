import { toNano } from '@ton/core';
import { TonLoanContract } from '../wrappers/TonLoanContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonLoanContract = provider.open(TonLoanContract.createFromConfig({}, await compile('TonLoanContract')));

    await tonLoanContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tonLoanContract.address);

    // run methods on `tonLoanContract`
}
