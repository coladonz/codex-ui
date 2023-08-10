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
    BALANCER_20WETH_80LIT: "0xF3a605DA753e9dE545841de10EA8bFfBd1Da9C75",
    OLIT: "0x63390fB9257AaBF54fbB9aCCDE3b927Edd2fB4a2",
    voterProxy: '0x4716f43D1965c822E56C498c8B48a32d483E8403',
    cdx: '0x8A869DEcf86039378Ab8866a9540cC0D4deb21F1',
    booster: '0x069e9eedceDAF9D9b64C9e2B5A3E006D3F90ACc8',
    cdxLIT: '0xBb920F2D3745d29d9AAd3629125acf53CCB9B0B4',
    litDepositor: '0x3134d1E4aB3d43148Caa66Af5485fAa7Bf41eD41',
    poolManagerProxy: '0x5547CAFe3E73d0bf212FdBFb6E3a2B03b2AcF05b',
    poolManagerSecondaryProxy: '0x6983Bcb4cBf743baF1060D72926d29D99677889B',
    poolManagerV4: '0x4b73388F33050D47e24534E5A3BEBf04992Aff1a',
    tokenFactory: '0xC3f1A8fBbAF09450a4DD4f740B48C1377Ae02419',
    rewardFactory: '0xa30B1f77Aa413800FCC9ef1343B2550600a72b3F',
    proxyFactory: '0x4aE1d2Ba82A8A3ab031351BbfA64163a61C92B49',
    stashFactory: '0xfb196A9b3f0D1b865c75AC7d39D4995DD3859a68',
    cdxRewardPool: '0xE930eD694e85E492Ac6Ef1f21d5cA2C595741b68',
    cdxLITRewardPool: '0x6F4CD5DDd2A58c1b2d907001FF18d7bD602935a0',
    cdxLocker: '0x0B3754c0C6e2B3cC021E7110d3eb12Db30C7aDC5',
    cdxStakingProxy: '0x267D00E89ADE99F2856432022D0618227d92dc35',
}

export const bunniGauges = [
    {
        pid: 0,
        name: "UNI/WETH",
        gauge: '0x910b9a14acC2b90ED5b09E1e4a59137e79F60414',
        bunniLp: '0xCe9F0944b0B326C7c647477B603aefC4Bdd2c825',
        token: '0xF06673890A741DF100CB9F6073EE77D3fEfF8bff',
        oLITRewards: '0xbC223e2CF8DB030E4834118aB3B8B6e3356ff178',
        stash: '0x11654b1a51B6962302501D787A7dD73915229694',
    },
];

export const tokens: {
    [address: string]: {
        name: string;
        symbol: string;
        decimals: number;
    }
} = {
    "0x63390fB9257AaBF54fbB9aCCDE3b927Edd2fB4a2": {
        name: "oLIT",
        symbol: "oLIT",
        decimals: 18
    }
}

export const getToken = (address: string) => {
    return tokens[address];
}

export default contracts;