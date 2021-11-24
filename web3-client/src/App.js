import React, { useEffect } from "react";
import "./App.css";
import useConnectToWallet from "./hooks/useConnectToWallet";
import useWave from "./hooks/useWave";

export default function App() {
  const {
    checkIfWalletIsConnected,
    currentAccount,
    connectWallet,
  } = useConnectToWallet();

  const {
    wave,
  } = useWave();


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">Hey there!</div>

        <div className="flexCenter">
          <div className="profile">
            <img src="/assets/profile.jpg" alt="profile" class="profilePicture" />
          </div>

          <a href="https://lekan.vercel.app" target="_blank" rel="noopener norefferer" className="portfolioButton">Check out my portfolio</a>
        </div>

        <div className="bio">
          I am <span>Mohammed Kabir Hussaini (lekandev)</span>,
          a Fullstack and mobile developer from Nigeria learning Web3
          Connect your Ethereum wallet (metamask) and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {/*
         * If there is no currentAccount render this button
         */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
