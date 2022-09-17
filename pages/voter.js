import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ballotContractAddress } from "../config";
import ballot from "../artifacts/contracts/Ballot.sol/Ballot.json";
import react from "react";

import { Radio, RadioGroup, Stack, Button, Input } from "@chakra-ui/react";
import { formatBytes32String } from "ethers/lib/utils";

export default function VoterPage() {
  const [voteOptions, setVoteOptions] = useState([]);
  const [delegate, setDelegate] = useState(null);
  const [value, setValue] = useState("");
  const [contract, setContract] = useState();
  const [input, setInput] = useState("");

  async function initializeBlockchain() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contractBallot = new ethers.Contract(
      ballotContractAddress,
      ballot.abi,
      signer
    );

    const tx = await contractBallot.getProposalNames();
    setVoteOptions(tx);
    setContract(contractBallot);
  }

  async function Vote(proposal) {
    await contract.vote(proposal);
  }

  async function delegateVote(delegatedAddress) {
    const tx = await contract.delegateVote(delegatedAddress);
  }

  useEffect(() => {
    initializeBlockchain();
  }, []);

  const handleChange = (event) => setInput(event.target.value);

  return (
    <div>
      <div className="ml-40 p-10 flex-col ">
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            {voteOptions.map((option, index) => {
              return (
                <Radio key={index} value={`${index}`}>
                  {option}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
        <Button
          className="ml-20"
          colorScheme="blue"
          onClick={() => Vote(value)}
        >
          Vote
        </Button>
      </div>
      <div>
        <Input
          placeholder="Enter address"
          value={input}
          onChange={handleChange}
        />
        <Button
          className="ml-20"
          colorScheme="blue"
          onClick={() => delegateVote(input)}
        >
          Delegate
        </Button>
      </div>
    </div>
  );
}
