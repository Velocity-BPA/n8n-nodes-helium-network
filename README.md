# n8n-nodes-helium-network

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for interacting with the Helium Network blockchain and IoT ecosystem. This node provides access to 7 core resources including accounts, hotspots, blocks, transactions, cities, validators, and elections, enabling comprehensive monitoring and analysis of the Helium Network infrastructure.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Helium Network](https://img.shields.io/badge/Helium-Network-purple)
![IoT](https://img.shields.io/badge/IoT-Infrastructure-green)
![Blockchain](https://img.shields.io/badge/Blockchain-HNT-orange)

## Features

- **Account Management** - Retrieve account details, balances, activity, and HNT transactions
- **Hotspot Monitoring** - Access hotspot information, rewards, witnesses, and network activity
- **Block Analysis** - Query blockchain blocks, transactions, and network consensus data
- **Transaction Tracking** - Monitor HNT transfers, rewards, and network transactions
- **City Analytics** - Analyze hotspot distribution and activity by geographic location
- **Validator Operations** - Track validator performance, elections, and consensus participation
- **Election Insights** - Monitor consensus group elections and validator selection
- **Real-time Data** - Access live network statistics and blockchain information

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-helium-network`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-helium-network
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-helium-network.git
cd n8n-nodes-helium-network
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-helium-network
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Helium Console API key | Yes |
| Base URL | Helium API base URL (auto-configured) | No |

## Resources & Operations

### 1. Account

| Operation | Description |
|-----------|-------------|
| Get Account | Retrieve account information by address |
| Get Balance | Get current account balance and nonce |
| Get Activity | List account activity and transactions |
| Get Rewards | Retrieve account reward history |
| Get Hotspots | List hotspots owned by account |
| Get Validators | List validators associated with account |

### 2. Hotspot

| Operation | Description |
|-----------|-------------|
| Get Hotspot | Retrieve hotspot details by address |
| Get Activity | Get hotspot activity and earnings |
| Get Rewards | List hotspot reward history |
| Get Witnesses | Get hotspot witness information |
| Get Witnessed | List hotspots witnessed by this hotspot |
| Get Challenges | Retrieve proof-of-coverage challenges |
| Search Hotspots | Search hotspots by name or location |

### 3. Block

| Operation | Description |
|-----------|-------------|
| Get Block | Retrieve block information by height or hash |
| Get Latest | Get the latest block information |
| Get Transactions | List transactions in a specific block |
| List Blocks | Retrieve multiple blocks with pagination |
| Get Statistics | Get blockchain statistics and metrics |

### 4. Transaction

| Operation | Description |
|-----------|-------------|
| Get Transaction | Retrieve transaction details by hash |
| List Transactions | List recent network transactions |
| Get Pending | Retrieve pending transactions |
| Search Transactions | Search transactions by type or account |
| Get Statistics | Get transaction volume and statistics |

### 5. City

| Operation | Description |
|-----------|-------------|
| Get City | Retrieve city information and hotspot count |
| List Cities | List all cities with hotspot activity |
| Get Hotspots | List hotspots in a specific city |
| Get Statistics | Get city-level network statistics |
| Search Cities | Search cities by name or country |

### 6. Validator

| Operation | Description |
|-----------|-------------|
| Get Validator | Retrieve validator information by address |
| List Validators | List all active validators |
| Get Activity | Get validator activity and performance |
| Get Rewards | Retrieve validator reward history |
| Get Statistics | Get validator network statistics |
| Get Elections | List elections validator participated in |

### 7. Election

| Operation | Description |
|-----------|-------------|
| Get Election | Retrieve election details by height |
| List Elections | List recent consensus group elections |
| Get Members | Get election consensus group members |
| Get Statistics | Get election and consensus statistics |

## Usage Examples

```javascript
// Get account balance and information
{
  "address": "13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx",
  "operation": "getAccount"
}
```

```javascript
// Monitor hotspot rewards and activity
{
  "address": "112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6fA1QCa4o",
  "operation": "getRewards",
  "minTime": "2024-01-01T00:00:00Z",
  "maxTime": "2024-01-31T23:59:59Z"
}
```

```javascript
// Retrieve latest blockchain information
{
  "operation": "getLatest",
  "includeTransactions": true
}
```

```javascript
// Search hotspots in a specific city
{
  "cityId": "san-francisco-california-united-states",
  "operation": "getHotspots",
  "limit": 50
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and active |
| Rate Limit Exceeded | Too many requests sent to Helium API | Implement delays between requests |
| Address Not Found | Specified account or hotspot address doesn't exist | Verify address format and existence |
| Invalid Parameters | Request parameters are malformed or missing | Check parameter format and requirements |
| Network Timeout | Request timed out connecting to Helium API | Retry request or check network connectivity |
| Service Unavailable | Helium API is temporarily unavailable | Wait and retry, check Helium status page |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-helium-network/issues)
- **Helium Documentation**: [Helium Developer Portal](https://docs.helium.com/)
- **Helium Community**: [Helium Discord](https://discord.gg/helium)