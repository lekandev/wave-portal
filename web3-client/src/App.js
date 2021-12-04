import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import waveportal from './utils/WavePortal.json';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const contractAddress = "0xE183e3Ef0E2D8D50450E6593399F73B9380917EE";

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, waveportal.abi, signer);

        const waves = await wavePortalContract.getAllWaves();

        const wavesCleaned = waves.map(wave => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          };
        });

        setAllWaves(wavesCleaned);
        console.log(allWaves)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(contractAddress, waveportal.abi, signer);

        let count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await waveportalContract.wave(message);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get message from input and store in message state

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  // /**
  //  * Listen in for emitter events!
  //  */
  // useEffect(() => {
  //   let wavePortalContract;

  //   const onNewWave = (from, timestamp, message) => {
  //     console.log("NewWave", from, timestamp, message);
  //     setAllWaves((prevState) => [
  //       ...prevState,
  //       {
  //         address: from,
  //         timestamp: new Date(timestamp * 1000),
  //         message: message,
  //       },
  //     ]);
  //   };

  //   if (window.ethereum) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();

  //     wavePortalContract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       signer
  //     );
  //     wavePortalContract.on("NewWave", onNewWave);
  //   }

  //   return () => {
  //     if (wavePortalContract) {
  //       wavePortalContract.off("NewWave", onNewWave);
  //     }
  //   };
  // }, []);
  
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
    </div>
  );
}

