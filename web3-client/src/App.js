import React, { useEffect } from "react";
import "./App.css";
import useConnectToWallet from "./hooks/useConnectToWallet";
import useWave from "./hooks/useWave"

export default function App() {
  const { checkIfWalletIsConnected, currentAccount, connectWallet } =
    useConnectToWallet();

  const { wave, allWaves, message, handleChange } = useWave();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">Hey there!</div>

        <div className="flexCenter">
          <div className="profile">
            <img
              src="/assets/profile.jpg"
              alt="profile"
              className="profilePicture"
            />
          </div>

          <a
            href="https://lekan.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolioButton"
          >
            Check out my portfolio
          </a>
        </div>

        <div className="bio">
          I am <span>Mohammed Kabir Hussaini (lekandev)</span>, a Fullstack and
          mobile developer from Nigeria learning Web3. Connect your Ethereum
          wallet (metamask) and wave at me!
        </div>

        <input
          type="text"
          placeholder="Type a message and click the 'Wave at me' button"
          className="messageInput"
          value={message}
          onChange={handleChange}
        />

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

        <div className="messages">
          <div className="message">
            <div>Address: 0x1e341AA1D51d5D18c4AE1B9ae33523</div>
            <div>
              Time: Sat Nov 27 2021 17:30:34 GMT+0100 (West Africa Standard
              Time)
            </div>
            <div>Message: sup sup sup</div>
          </div>
          <div className="message">
            <div>Address: 0x1e341AA1D51d5D18c4AE1B9ae33523</div>
            <div>
              Time: Sat Nov 27 2021 17:30:34 GMT+0100 (West Africa Standard
              Time)
            </div>
            <div>Message: sup sup sup</div>
          </div>
        </div>

        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="message">
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
