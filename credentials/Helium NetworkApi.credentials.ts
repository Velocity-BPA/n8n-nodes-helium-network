import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HeliumNetworkApi implements ICredentialType {
	name = 'heliumNetworkApi';
	displayName = 'Helium Network API';
	documentationUrl = 'https://docs.helium.com/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API key for Helium Network Console',
			required: false,
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.helium.io/v1',
			description: 'Base URL for Helium Network API',
			required: true,
		},
	];
}