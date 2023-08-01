import { useState } from 'react'

const Main = () => {
    const [amount, setAmount] = useState('1');
    const [percent, setPercent] = useState('5');

    function handleValidateAmount(_amount: string) {
        if (Number(_amount) < 1) {
            setAmount("1");
        } else if (Number(_amount) > 1000000) {
            setAmount("1000000");
        } else {
            setAmount(_amount);  
        }
    }
    function handleDoubleAmount() {
        const doubleAmount = Number(amount) * 2;
        if(doubleAmount > 1000000) {
            setAmount("1000000");
        } else {
            setAmount(doubleAmount.toString());
        }
    }
    function handleMaxAmount() {
        setAmount("1000000");
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
                                                            <button className="btn btn-warning btn-lg choose__btn">LESS</button>
                                                        </div>
                                                        <div className="choose__var">
                                                            <div className="choose__diaposon">{ 999999 - getRange() }-999999</div> 
                                                            <button className="btn btn-warning btn-lg choose__btn">MORE</button>
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
                                        <button type="button" className="btn btn-warning btn-lg">Connect Wallet</button>
                                    </div>
                                    <div className="col-md-2">
                                        <button type="button" className="btn btn-warning btn-lg">Claim Test Tokens</button>
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