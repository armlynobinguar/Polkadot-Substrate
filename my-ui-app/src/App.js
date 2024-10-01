import React, { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

const App = () => {
    const [api, setApi] = useState(null);
    const [contractInfo, setContractInfo] = useState(null);

    useEffect(() => {
        const provider = new WsProvider('ws://127.0.0.1:9944'); // Change if your node runs on a different port
        const apiPromise = ApiPromise.create({ provider });
        apiPromise.then(setApi);
    }, []);

    const fetchContractInfo = async () => {
        if (api) {
            // Replace with the appropriate contract address
            const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
            const contract = await api.query.contracts.contractInfoOf(contractAddress);
            setContractInfo(contract.toJSON());
        }
    };

    return (
        <div>
            <h1>Substrate Contracts Node UI</h1>
            <button onClick={fetchContractInfo}>Fetch Contract Info</button>
            {contractInfo && <pre>{JSON.stringify(contractInfo, null, 2)}</pre>}
        </div>
    );
};

export default App;
