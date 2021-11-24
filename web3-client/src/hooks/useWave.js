import { ethers } from "ethers";
import WavePortal from "../utils/WavePortal.json";

const useWave = () => {
  /**
   * Create a variable here that holds the contract address after you deploy!
   */
  const contractAddress = "0xca18601Bd5883ED42B58bD808e9776Fc49C6e06d";
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = WavePortal.abi;

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
         * Execute the actual wave from your smart contract
         */
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { wave };
};

export default useWave;
