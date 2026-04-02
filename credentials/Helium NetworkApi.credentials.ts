import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HeliumNetworkApi implements ICredentialType {
	name = 'heliumNetworkApi';
	displayName = 'Helium Network API';
	documentationUrl = 'https://docs.helium.com/api/blockchain/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.helium.io/v1',
			description: 'Base URL for the Helium Network API',
		},
	];
}