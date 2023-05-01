function log(msg) {
    msg = JSON.stringify(msg, null, 2)
    document.getElementById('out').innerHTML = `${msg}\n`
}

//wallet connect

  document.querySelector('#walletConnect').addEventListener('click', async (e) => {
    e.preventDefault() 
    await connect();
  });

  // registration of land

  document.querySelector('#registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const PlotNo = document.querySelector('#plotNo')
    if (!PlotNo.value) return log('Missing name')
    const aadharNo = document.querySelector('#aadharNo')
    if (!aadharNo.value) return log('Missing name')
    const blockName = document.querySelector('#blockName')
    if (!blockName.value) return log('Missing name')
    const districtName = document.querySelector('#districtName')
    if (!districtName.value) return log('Missing name')
    const stateName = document.querySelector('#stateName')
    if (!stateName.value) return log('Missing name')  
    await registationOfLand(PlotNo.value,aadharNo.value,blockName.value,districtName.value,stateName.value);
  })

  //view plot No using owner Id 

  document.querySelector('#viewPlotNOForm').addEventListener('submit', async (e) => {
    e.preventDefault()    
    const _ownerId = document.querySelector('#idNo')
    if (!_ownerId.value) return log('Missing name');
    let plotNo = []
    plotNo = await getPlotNoByOwnerId(_ownerId.value);     
  })

  //details of a plotNo 

  document.querySelector('#viewPlotDetails').addEventListener('submit', async (e) => {
    e.preventDefault()    
    const plotNu = document.querySelector('#plotNu')
    if (!plotNu.value) return log('Missing name')
    let plotDetails = await getPlotNoDetails(plotNu.value);    
  })

//   //transfer land details

  document.querySelector('#landTransfer').addEventListener('submit', async (e) => {
    e.preventDefault()    
    const ownerId = document.querySelector('#ownerId');
    if (!ownerId.value) return log('Missing name');
    const plotNum = document.querySelector('#plotNum')
    if (!plotNum.value) return log('Missing name')
    await transferLand(ownerId.value,plotNum.value);
  })

  


let accounts;

const networkId = '0x61';
// const networkId = '0x539';

const contractAddress = "0xB9134E0FfF52150e93D6358d15C2c4677F7C3b11";

const abi =  [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plotNo",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "ownerOfLand",
				"type": "bytes32"
			}
		],
		"name": "registration",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "plotNo",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newOwnerOfLand",
				"type": "bytes32"
			}
		],
		"name": "transferLand",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ownerId",
				"type": "uint256"
			}
		],
		"name": "convertOwnerIdToHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ownerID",
				"type": "uint256"
			}
		],
		"name": "getPlotNoByOwnerId",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_plotNo",
				"type": "uint256"
			}
		],
		"name": "getPlotNoDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "ownerId",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "BlockName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "DistrictName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "StateName",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "Set",
						"type": "bool"
					}
				],
				"internalType": "struct LandRegistration.landDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_plotNo",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_ownerId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_blockName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_districtName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_stateName",
				"type": "string"
			}
		],
		"name": "landRegistration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_plotNo",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_newOwner",
				"type": "bytes32"
			}
		],
		"name": "transferLandOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

let provider;

window.onload = function(){
    console.log("Dapp is initialized....")
    if(window.ethereum){
        this.ethereum.on('accountsChanged',handleAccountsChanged);

        window.ethereum.request({method:'eth_accounts'}).then(handleAccountsChanged).catch((err)=>{console.log(err)});

        provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("provider",provider)
    }
    else{
      alert("Install Metamask");
      console.log("PLEASE INSTALL METAMASK....");
    }
}


export const connect = async() =>{
    accounts = await window.ethereum.request({method:'eth_requestAccounts'}).then(accounts => {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("connected Account is ", accounts); // an array of accounts
    })
    .catch((err) =>{
        //error handling
        console.log(err.code);
    })
    await checkNetworkId()
}

const handleAccountsChanged = (a) =>{
    console.log("Accounts Changed");
    accounts = a;
}

async function checkNetworkId(){
    const network = await provider.getNetwork();
    console.log("current network Id",network.chainId);
    if(network.chainId != networkId){
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkId }],
      });
      alert("Network Changed");
      console.log("Metamask Network changed");
    }
}

//registration of land

export const registationOfLand = async (_plotNo,_ownerId,_blockName,_districtName,_stateName) => {
    await connect();
    let contractInstance = new ethers.Contract(contractAddress,abi,provider.getSigner());
    let ownerIDConverted = ethers.utils.solidityKeccak256(["uint256"], [_ownerId]);
    await contractInstance.landRegistration(_plotNo, ownerIDConverted, _blockName, _districtName, _stateName).then((tx)=>{
        alert("Registration is successful");
        console.log("the transaction is",tx);
    }).catch((err)=>{
        let error = err.data.message;
        alert(`Error while Fetching Details - ${error}`)
    })
    
}

//get all Plot No using owner Id

export const getPlotNoByOwnerId = async (_ownerID) => {
    await connect();
    let contractInstance = new ethers.Contract(contractAddress,abi,provider);
    let plotNo = [];
    await contractInstance.getPlotNoByOwnerId(_ownerID).then((_plotNO)=>{
        plotNo = _plotNO.toString();
        alert(`The list of All Plot Number hold by the owner Id is - ${plotNo}`)
    }).catch((err)=>{
        plotNo = err.data.message;
        alert(`Error while Fetching Details - ${plotNo}`)
    });
    return plotNo;
}

//get plot details

export const getPlotNoDetails = async (_plotNo) => {
    await connect();
    let contractInstance = new ethers.Contract(contractAddress,abi,provider);
    let plotDetails;
    await contractInstance.getPlotNoDetails(_plotNo).then((_plotNO)=>{
        plotDetails = {
            ownerId : _plotNO.ownerId,
            BlockName : _plotNO.BlockName,
            DistrictName : _plotNO.DistrictName,
            StateName : _plotNO.StateName,
            Set : _plotNO.Set
        };
        alert(`The Details of the Plot Number ${JSON.stringify(plotDetails,null,'\t')}`)
    }).catch((err)=>{
        let plotNo = err.data.message;
        alert(`Error while Fetching Details - ${plotNo}`)
    });
    return JSON.stringify(plotDetails,null,'\t');
}

//transfer Land 

export const transferLand = async (_ownerID,_plotNO) => {
    let contractInstance = new ethers.Contract(contractAddress,abi,provider.getSigner());
    let ownerIDConverted = ethers.utils.solidityKeccak256(["uint256"], [_ownerID]);
    await contractInstance.transferLandOwnership(_plotNO,ownerIDConverted).then((tx)=>{
        alert(`Transfer of Land is successful`);
        console.log("the transaction is",tx);
    }).catch((err)=>{
        let error = err.data.message;
        alert(`Error while Fetching Details - ${error}`)
    })
    
}
