import { IStorage, EncryptedWalletAttributes, EncryptedSeedAttributes } from '@jolocom/sdk/js/src/lib/storage';
import { Connection } from 'typeorm';
import { SignedCredential } from 'jolocom-lib/js/credentials/signedCredential/signedCredential';
import { CredentialOfferMetadata, CredentialOfferRenderInfo } from 'jolocom-lib/js/interactionTokens/interactionTokens.types';
import { IdentitySummary } from '@jolocom/sdk/js/src/lib/types';
import { DidDocument } from 'jolocom-lib/js/identity/didDocument/didDocument';
import { InternalDb } from 'local-did-resolver';
import { JWTEncodable, JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken';
export interface PersonaAttributes {
    did: string;
    controllingKeyPath: string;
}
/**
 * @todo IdentitySummary is a UI type, which can always be
 * derived from a DID Doc and Public Profile.
 * Perhaps that's what we should store instead, since those
 * are more generic and can be reused.
 */
export declare class JolocomTypeormStorage implements IStorage {
    private connection;
    store: {
        setting: (key: string, value: any) => Promise<void>;
        verifiableCredential: (vCred: SignedCredential) => Promise<void>;
        encryptedSeed: (args: EncryptedSeedAttributes) => Promise<void>;
        encryptedWallet: (args: EncryptedWalletAttributes) => Promise<void>;
        credentialMetadata: (credentialMetadata: CredentialMetadataSummary) => Promise<void>;
        issuerProfile: (issuer: IdentitySummary) => Promise<void>;
        didDoc: (doc: DidDocument) => Promise<void>;
        interactionToken: (token: JSONWebToken<JWTEncodable>) => Promise<void>;
    };
    get: {
        settingsObject: () => Promise<{
            [key: string]: any;
        }>;
        setting: (key: string) => Promise<any>;
        verifiableCredential: (query?: object | undefined) => Promise<SignedCredential[]>;
        attributesByType: (type: string[]) => Promise<{
            type: string[];
            results: {
                verification: any;
                values: any;
                fieldName: any;
            }[];
        }>;
        vCredentialsByAttributeValue: (attribute: string) => Promise<SignedCredential[]>;
        encryptedSeed: () => Promise<string | null>;
        encryptedWallet: () => Promise<EncryptedWalletAttributes | null>;
        credentialMetadata: ({ issuer, type: credentialType, }: SignedCredential) => Promise<any>;
        publicProfile: (did: string) => Promise<IdentitySummary>;
        didDoc: (did: string) => Promise<DidDocument>;
        interactionTokens: (attrs: {
            nonce?: string | undefined;
            type?: string | undefined;
            issuer?: string | undefined;
        }) => Promise<JSONWebToken<JWTEncodable>[]>;
    };
    delete: {
        verifiableCredential: (id: string) => Promise<void>;
    };
    constructor(conn: Connection);
    private getSettingsObject;
    private getSetting;
    private saveSetting;
    private getVCredential;
    private getAttributesByType;
    private getVCredentialsForAttribute;
    private getEncryptedWallet;
    private getEncryptedSeed;
    private findTokens;
    private getMetadataForCredential;
    private getPublicProfile;
    private getCachedDIDDoc;
    private storeEncryptedWallet;
    private storeEncryptedSeed;
    private storeCredentialMetadata;
    private storeIssuerProfile;
    private cacheDIDDoc;
    private storeInteractionToken;
    private storeVClaim;
    private deleteVCred;
    private readEventLog;
    private appendEvent;
    private deleteEventLog;
    eventDB: InternalDb;
}
export interface CredentialMetadata {
    type: string;
    renderInfo: CredentialOfferRenderInfo;
    metadata: CredentialOfferMetadata;
}
export interface CredentialMetadataSummary extends CredentialMetadata {
    issuer: IdentitySummary;
}