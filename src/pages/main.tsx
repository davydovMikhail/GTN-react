import { useState, useEffect, useRef } from 'react'
import { useEthers } from "@usedapp/core";
import { useGetBalance } from '../hooks/useGetBalance';
import { useClaimTestTokens } from '../hooks/useClaimTestTokens';
import { useGetAllowance } from '../hooks/useGetAllowance';
import { toast } from "react-toastify";
import { useActions } from '../hooks/useActions';
import { useApproveToGame } from '../hooks/useApproveToGame';
import { usePlayBid } from '../hooks/usePlayBid';
import { useRequestGameHash } from '../hooks/useRequestGameHash';
import { useGetRandomNumber } from '../hooks/useGetRandomNumber';
import { useGetLastHash } from '../hooks/useGetLastHash';
import { useGetCurrentBlockNumber } from '../hooks/useGetBlockNumber';
import SetInterval from 'set-interval'

const Main = () => {
    const { activateBrowserWallet, account } = useEthers();
    const { SetNotification, SetLoader, SetShowOk } = useActions();

    const start: any = useRef();

    const [amount, setAmount] = useState('1');
    const [percent, setPercent] = useState('5');
    const [balance, setBalance] = useState(0);
    const firstIteration = useRef(true);
    const getBalanceHook = useGetBalance();
    const claimHook = useClaimTestTokens();
    const allowanceHook = useGetAllowance();
    const approveHook = useApproveToGame();
    const requestHook = useRequestGameHash();
    const randomHook = useGetRandomNumber();
    const playHook = usePlayBid();
    const hashHook = useGetLastHash();
    const blockHook = useGetCurrentBlockNumber();

    useEffect(() => {
        const fetchData = async () => {
            const balanceAccount = await getBalanceHook(account as string);               
            setBalance(balanceAccount as number);
        }
        fetchData().catch(console.error);
    }, [account]);
    async function handlePlay(isGreater: boolean) {
        if (!account) {
            toast.info('First connect your wallet', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
            return;
        }
        firstIteration.current = true;
        SetLoader(true);
        if((await allowanceHook(account) as number) < Number(amount)) {
            SetNotification('Approve your game tokens to the address of the game contract');
            await approveHook();
        }
        SetNotification('Requesting the hash of your game...');
        const hashBefore = await hashHook(account);
        const balanceBefore = (await getBalanceHook(account as string)) as number;
        const targetBlock = (await requestHook(amount, percent, isGreater))?.blockNumber.toString() as string;
        SetNotification('Confirm the call to the play function');
        SetInterval.start(async () => {
            const currentBlock = (await blockHook()) as number;
            const hashAfter = await hashHook(account);
            if(hashBefore !== hashAfter && currentBlock > Number(targetBlock) && firstIteration.current) {
                firstIteration.current = false;
                SetInterval.clear('checkHash')
                clearInterval(start.current);
                await playHook();
                const randomNumber = await randomHook(targetBlock, account);
                const balanceAfter = (await getBalanceHook(account as string)) as number;
                if(balanceAfter > balanceBefore) {
                    SetNotification(`You've won! The block number - ${targetBlock}. Random number - ${randomNumber}`);
                } else {
                    SetNotification(`Your bet is not played! The block number - ${targetBlock}. Random number - ${randomNumber}`);
                }
                SetShowOk(true);     
                setBalance(balanceAfter);
            }
        }, 500, "checkHash")
    }
    async function handleClaim() {
        if (!account) {
            toast.info('First connect your wallet', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
            return;
        }
        SetLoader(true);
        await claimHook();
        SetLoader(false);
        const balanceAccount = await getBalanceHook(account as string);               
        setBalance(balanceAccount as number);
    }
    function handleValidateAmount(_amount: string) {
        if (Number(_amount) < 1) {
            setAmount("1");
        } else if (Number(_amount) > balance) {
            setAmount(balance.toString());
        } else {
            setAmount(_amount);  
        }
    }
    function handleDoubleAmount() {
        const doubleAmount = Number(amount) * 2;
        if(doubleAmount > balance) {
            setAmount(balance.toString());
        } else {
            setAmount(doubleAmount.toString());
        }
    }
    function handleMaxAmount() {
        setAmount(balance.toString());
    }
    function handleHalfAmount() {
        const halfAmount = Number(amount) / 2;
        if(halfAmount < 1) {
            setAmount("1");
        } else {
            setAmount(halfAmount.toString());
        }
    }
    function handleMinAmount() {
        setAmount("1");
    }
    function handleValidatePercent(_percent: string) {
        if(Number(_percent) > 95) {
            setPercent('95');
        } else if(Number(_percent) < 5) {
            setPercent('5');
        } else if(!_percent) {
            setPercent('50');
        } else {
            setPercent(Math.trunc(Number(_percent)).toString());
        }   
    }
    function handleDoublePercent() {
        const doublePercent = Number(percent) * 2;
        if(doublePercent > 95) {
            setPercent('95');
        } else {
            setPercent(Math.trunc(doublePercent).toString());
        }
    }
    function handleMaxPercent() {
        setPercent('95');
    }
    function handleMinPercent() {
        setPercent('5');
    }
    function handleHalfPercent() {
        const halfPercent = Number(percent) / 2;
        if(halfPercent < 5) {
            setPercent('5');
        } else {
            setPercent(Math.trunc(halfPercent).toString());
        }
    }
    function getRange() {
        if(Number(percent) < 5 || Number(percent) > 95) {
          return NaN
        }
        return 10000 * Number(percent) -1;
    }
    function getPossibleWin() {
        if(Number(percent) < 5 || Number(percent) > 95 || Number(amount) < 1) {
          return "NaN"
        }
        return (Number(amount) * 100) / Number(percent);
    }

    return (
        <>
            <div className="nude">
                <div className="wrapper">
                    <div className="main">
                        <div className="section section-white">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="space-top"></div>
                                        <div className="tim-container">
                                        <div className="tim-row" id="edit-metric-labels">
                                            <h2>Guess The Number!!!</h2>
                                            <legend></legend>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Bid amount</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <input 
                                                            type="number"
                                                            placeholder="Amount" 
                                                            className="form-control border-input"
                                                            value={amount || ''}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            onBlur={(e) => handleValidateAmount(e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="small-btns">
                                                        <button onClick={() => handleDoubleAmount()} className="btn btn-primary btn-xs small-btn">double</button>
                                                        <button onClick={() => handleMaxAmount()} className="btn btn-primary btn-xs small-btn">max</button>
                                                        <button onClick={() => handleHalfAmount()} className="btn btn-primary btn-xs small-btn">half</button>
                                                        <button onClick={() => handleMinAmount()} className="btn btn-primary btn-xs small-btn">min</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Chance of win</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <input 
                                                            type="number" 
                                                            placeholder="Percent" 
                                                            className="form-control border-input"
                                                            value={percent || ''}
                                                            onChange={(e) => setPercent(e.target.value)}  
                                                            onBlur={(e) => handleValidatePercent(e.target.value)}  
                                                        />
                                                    </div>
                                                    <div className="small-btns">
                                                        <button onClick={() => handleDoublePercent()} className="btn btn-primary btn-xs small-btn">double</button>
                                                        <button onClick={() => handleMaxPercent()} className="btn btn-primary btn-xs small-btn">max</button>
                                                        <button onClick={() => handleHalfPercent()} className="btn btn-primary btn-xs small-btn">half</button>
                                                        <button onClick={() => handleMinPercent()} className="btn btn-primary btn-xs small-btn">min</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="info">
                                                        <div className="info__win">
                                                            {getPossibleWin()}
                                                        </div>
                                                        <div className="info__win__title">Possible win</div>
                                                    </div>
                                                    <div className="choose">
                                                        <div className="choose__var">
                                                            <div className="choose__diaposon">0-{ getRange() }</div> 
                                                            <button onClick={() => handlePlay(false)} className="btn btn-warning btn-lg choose__btn">LESS</button>
                                                        </div>
                                                        <div className="choose__var">
                                                            <div className="choose__diaposon">{ 999999 - getRange() }-999999</div> 
                                                            <button onClick={() => handlePlay(true)} className="btn btn-warning btn-lg choose__btn">MORE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <button onClick={() => activateBrowserWallet()} type="button" className="btn btn-warning btn-lg">Connect Wallet</button>
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={() => handleClaim()} type="button" className="btn btn-warning btn-lg">Claim Test Tokens</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 h4" >
                                        {account ? `Your Wallet: ${account}`: "Click 'Connect Wallet'"}
                                    </div>
                                </div>
                                {account && 
                                    <div className="row">
                                        <div className="col-md-8 h4" >
                                            Your balance: {balance} TGT
                                        </div>
                                    </div>
                                }
                                <div className="row">
                                    <div className="col-md-8 h4" >
                                        Address token: 0x12a804d83957Dd32E7f8bC997681E7Ecd4920949 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 h4" >
                                        Address game: 0x9E0ab0FE2365c1bF5FB98a7035e49c458CC82C63 
                                    </div>
                                </div>
                            
                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <h2>Random numbers</h2>
                                    </div>
                                    <div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <label>Block number</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <label>Random number</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <div className="form-control">1000</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <div className="form-control">100303</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        
    )
}

export default Main;