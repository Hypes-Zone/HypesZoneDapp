import { CONNECTION_RPC_URI, HYPES_TOKEN_ADDRESS } from "@/settings";


export async function getHypesTokenBalance(walletAddress: string) {
  const requestBody = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByOwner",
    params: [
      walletAddress,
      { mint: HYPES_TOKEN_ADDRESS },
      { encoding: "jsonParsed" }
    ]
  };

  try {
    const response = await fetch(CONNECTION_RPC_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    // Extract and sum up balances if multiple accounts exist
    let totalBalance = 0;
    if (data.result && data.result.value.length > 0) {
      totalBalance = data.result.value.reduce((sum: any, account: any) => {
        return sum + (account.account.data.parsed.info.tokenAmount.uiAmount || 0);
      }, 0);
    }

    return totalBalance;
  } catch (error) {
    console.error("Error fetching Hypes SPL token balance:", error);
    return null;
  }
}
