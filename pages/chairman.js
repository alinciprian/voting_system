import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ballotContractAddress } from "../config";
import ballot from "../artifacts/contracts/Ballot.sol/Ballot.json";
import react from "react";

import { Radio, RadioGroup, Stack, Button, Input } from "@chakra-ui/react";
import { formatBytes32String } from "ethers/lib/utils";

export default function ChairmanPage() {
  const [contract, setContract] = useState();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  async function initialize() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contractBallot = new ethers.Contract(
      ballotContractAddress,
      ballot.abi,
      signer
    );
    setContract(contractBallot);
  }

  useEffect(() => {
    initialize();
  }, []);

  async function giveRightToVote(address) {
    await contract.giveRightToVote(address);
    setList((oldArray) => {
      [...oldArray, address];
    });
  }
  console.log(list);

  const handleChange = (event) => setInput(event.target.value);

  return (
    <div>
      <Input
        placeholder="Enter address"
        value={input}
        onChange={handleChange}
      />
      <Button
        className="ml-20"
        colorScheme="blue"
        onClick={() => giveRightToVote(input)}
      >
        Give Right
      </Button>
      {/* {list.map((address) => {
        return <p>{address}</p>;
      })} */}
    </div>
  );
}
