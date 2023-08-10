export type GaugeInfo = {
    pid: number;
    name: string;
    gauge: string;
    bunniLp: string;
    token: string;
    oLITRewards: string;
    stash: string;
}

const contracts = {
    BALANCER_20WETH_80LIT: "0x9232a548DD9E81BaC65500b5e0d918F8Ba93675C",
    OLIT: "0x627fee87d0D9D2c55098A06ac805Db8F98B158Aa",
    voterProxy: '0x021DBfF4A864Aa25c51F0ad2Cd73266Fde66199d',
    cdx: '0x4CF4dd3f71B67a7622ac250f8b10d266Dc5aEbcE',
    booster: '0x447786d977Ea11Ad0600E193b2d07A06EfB53e5F',
    cdxLIT: '0xE2b5bDE7e80f89975f7229d78aD9259b2723d11F',
    litDepositor: '0xC6c5Ab5039373b0CBa7d0116d9ba7fb9831C3f42',
    poolManagerProxy: '0x9155497EAE31D432C0b13dBCc0615a37f55a2c87',
    poolManagerSecondaryProxy: '0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798',
    poolManagerV4: '0xC220Ed128102d888af857d137a54b9B7573A41b2',
    tokenFactory: '0xce830DA8667097BB491A70da268b76a081211814',
    rewardFactory: '0xD5bFeBDce5c91413E41cc7B24C8402c59A344f7c',
    proxyFactory: '0x77AD263Cd578045105FBFC88A477CAd808d39Cf6',
    stashFactory: '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
    cdxRewardPool: '0x6484EB0792c646A4827638Fc1B6F20461418eB00',
    cdxLITRewardPool: '0x1757a98c1333B9dc8D408b194B2279b5AFDF70Cc',
    cdxLocker: '0x26291175Fa0Ea3C8583fEdEB56805eA68289b105',
    cdxStakingProxy: '0x840748F7Fd3EA956E5f4c88001da5CC1ABCBc038',
}

export const bunniGauges = [
    {
        pid: 0,
        name: "Bunni WETH/swETH 0.9259 ~ 0.9802",
        gauge: '0xa718193E1348FD4dEF3063E7F4b4154BAAcB0214',
        bunniLp: '0x846A4566802C27eAC8f72D594F4Ca195Fe41C07a',
        token: '0x865fe8d74e7C585c57dAcF2A855fDFd0a56db7Cb',
        oLITRewards: '0x1d9ada9F4e1b720F945F303999eE52443F302B82',
        stash: '0x3b21b7B09dd61e8cd9580ef516b3BBB80E8bf19F',
    },
    {
        pid: 1,
        name: "Bunni WETH/swETH 0.8 ~ 0.8",
        gauge: '0xa718193E1348FD4dEF3063E7F4b4154BAAcB0214',
        bunniLp: '0x846A4566802C27eAC8f72D594F4Ca195Fe41C07a',
        token: '0x865fe8d74e7C585c57dAcF2A855fDFd0a56db7Cb',
        oLITRewards: '0x1d9ada9F4e1b720F945F303999eE52443F302B82',
        stash: '0x3b21b7B09dd61e8cd9580ef516b3BBB80E8bf19F',
    }
];

export const tokens: {
    [address: string]: {
        name: string;
        symbol: string;
        decimals: number;
    }
} = {
    "0x627fee87d0D9D2c55098A06ac805Db8F98B158Aa": {
        name: "oLIT",
        symbol: "oLIT",
        decimals: 18
    }
}

export const getToken = (address: string) => {
    return tokens[address];
}

export default contracts;