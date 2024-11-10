import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TonLoanContractConfig = {};

export function tonLoanContractConfigToCell(config: TonLoanContractConfig): Cell {
    return beginCell().endCell();
}

export class TonLoanContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TonLoanContract(address);
    }

    static createFromConfig(config: TonLoanContractConfig, code: Cell, workchain = 0) {
        const data = tonLoanContractConfigToCell(config);
        const init = { code, data };
        return new TonLoanContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
