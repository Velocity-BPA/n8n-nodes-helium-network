# n8n-nodes-helium-network

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with the Helium Network blockchain and IoT infrastructure. With 6 resources and extensive operations, it enables monitoring of hotspots, tracking rewards, managing validator data, and analyzing blockchain metrics for the world's largest decentralized wireless network.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Helium Network](https://img.shields.io/badge/Helium-Network-purple)
![Blockchain](https://img.shields.io/badge/Blockchain-IoT-green)
![API](https://img.shields.io/badge/API-REST-orange)

## Features

- **Hotspot Management** - Monitor hotspot status, earnings, witnesses, and activity across the Helium Network
- **Account Analytics** - Track account balances, transaction history, and HNT token movements
- **Validator Operations** - Access validator performance metrics, stake information, and consensus participation
- **Rewards Tracking** - Retrieve detailed reward distributions, mining rewards, and token economics data
- **Blockchain Insights** - Query blockchain statistics, block data, and network health metrics
- **Election Monitoring** - Track consensus group elections and validator selection processes
- **Real-time Data** - Access live network data for automated monitoring and alerting workflows
- **Comprehensive Coverage** - Full API integration with all major Helium Network endpoints

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
| API Key | Your Helium Console API key for authenticated requests | Yes |
| Environment | API environment (mainnet/testnet) | Yes |
| Rate Limit | Request rate limit per minute (default: 60) | No |

## Resources & Operations

### 1. Hotspots

| Operation | Description |
|-----------|-------------|
| Get Hotspot | Retrieve detailed information about a specific hotspot |
| List Hotspots | Get a list of all hotspots with filtering options |
| Get Hotspot Activity | Fetch activity history for a hotspot |
| Get Hotspot Rewards | Retrieve reward history for a specific hotspot |
| Get Hotspot Witnesses | Get list of hotspots witnessed by a specific hotspot |
| Get Hotspot Challenges | Fetch challenge activity for a hotspot |
| Search Hotspots | Search hotspots by name, location, or owner |

### 2. Accounts

| Operation | Description |
|-----------|-------------|
| Get Account | Retrieve account information and balance |
| Get Account Activity | Fetch transaction activity for an account |
| Get Account Rewards | Get reward history for a specific account |
| Get Account Hotspots | List all hotspots owned by an account |
| Get Account Validators | Retrieve validators associated with an account |
| Get Account Transactions | Fetch transaction history with filtering |

### 3. Validators

| Operation | Description |
|-----------|-------------|
| Get Validator | Retrieve detailed validator information |
| List Validators | Get list of all validators with status |
| Get Validator Activity | Fetch validator consensus and activity data |
| Get Validator Rewards | Retrieve reward history for a validator |
| Get Validator Elections | Get election history for a validator |
| Search Validators | Search validators by name or address |

### 4. Rewards

| Operation | Description |
|-----------|-------------|
| Get Rewards Summary | Retrieve network-wide reward statistics |
| Get Hotspot Rewards | Fetch detailed reward data for hotspots |
| Get Validator Rewards | Get validator reward distributions |
| Get Account Rewards | Retrieve account-specific reward history |
| Calculate Rewards | Estimate potential rewards for activities |

### 5. Blockchain

| Operation | Description |
|-----------|-------------|
| Get Block | Retrieve specific block information |
| Get Latest Block | Fetch the most recent block data |
| Get Block Transactions | List all transactions in a block |
| Get Network Stats | Retrieve network statistics and metrics |
| Get Chain Variables | Fetch blockchain configuration variables |
| Get Oracle Prices | Get HNT price data from oracle |

### 6. Elections

| Operation | Description |
|-----------|-------------|
| Get Current Election | Retrieve ongoing consensus group election |
| Get Election History | Fetch historical election data |
| Get Election Results | Get results of completed elections |
| Get Consensus Members | List current consensus group members |

## Usage Examples

```javascript
// Monitor hotspot earnings and status
{
  "hotspot_address": "112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6PpBP4YxHEd",
  "time_period": "24h",
  "include_rewards": true,
  "include_activity": true
}
```

```javascript
// Track account portfolio and transactions
{
  "account_address": "13buBykFQf5VaQtv7mWj2PBY9Lq4i1DeXhg7C4Vbu3ppzqqNkTH",
  "activity_filter": "rewards_v2",
  "min_time": "2024-01-01T00:00:00Z",
  "cursor": null
}
```

```javascript
// Analyze validator performance
{
  "validator_address": "112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6P4YxHEd",
  "metrics": ["consensus_groups", "penalties", "tenure"],
  "period": "30d"
}
```

```javascript
// Get network blockchain statistics
{
  "include_price": true,
  "include_supply": true,
  "block_range": 100,
  "format": "json"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid or missing API key | Verify API key in credentials configuration |
| 404 Not Found | Hotspot, account, or validator address not found | Check address format and existence on network |
| 429 Rate Limited | Too many requests sent to API | Implement delays between requests or reduce frequency |
| 422 Invalid Parameters | Malformed request parameters | Validate input data and parameter formats |
| 500 Server Error | Helium API service unavailable | Retry request after delay or check Helium status |
| Network Timeout | Request timeout or connectivity issue | Check internet connection and API endpoint status |

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
- **Helium Documentation**: [Helium Developer Documentation](https://docs.helium.com/)
- **Community**: [Helium Discord Community](https://discord.gg/helium)