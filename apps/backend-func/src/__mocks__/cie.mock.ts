export const cieMetadata = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?><EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:mdui="urn:oasis:names:tc:SAML:metadata:ui" xmlns:shibmd="urn:mace:shibboleth:metadata:1.0" entityID="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST/SSO"><ds:Signature>
<ds:SignedInfo>
<ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
<ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
<ds:Reference URI="">
<ds:Transforms>
<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
<ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
</ds:Transforms>
<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
<ds:DigestValue>ssh7Qe/Sett1HNLh/vQYvNUkCjfgEhAg8Ce4f1GL+Mg=</ds:DigestValue>
</ds:Reference>
</ds:SignedInfo>
<ds:SignatureValue>
UI+4D9XebmPI96WgQAgSo+IrNzAObjecitjsR6l8gSYmtNDLNLYPeobF4kpFY34Y5bTm+IL1K9VN
hhnBeJBeuL9oSBee9PaDzCSt+hmrcQdKvAr05UWDsg96ZYkgyuDugcmbRl3+PBpHzheK0qnVGZne
BTSOrFk9vpYxrd2cHv/C6/DV6vNHJFe7uf2LE8yZ+qJqT/UKUgdS0qtW6FjdTOq44BxujJsi/1Yo
DiIMvDjKxNrWKjxgpra35i1D1iS6jAEG68nVHjFROQ0ciUS8+9JyoUvQJ3YkVdDAhnsrMtIE8w2A
RXL19GhWAw2wR8SKVEZeSNTkf34AQIHLx0vjiA==
</ds:SignatureValue>
<ds:KeyInfo>
<ds:KeyValue>
<ds:RSAKeyValue>
<ds:Modulus>
x62o94jkwiCC05Ts4nEhLhbdN5Cr0A6hlkXeaO7NVu0j9hLXE5oN8a6J/7G6yxC/3jFEFfwYs+ie
KRBqBaTGUBxsTlcqZjuzXPKZBaLe8lEwKa+iJLsuHFLW8dIOX5ECzW97qSINFYNY0p0VxL1AsoK/
/RHiglDov9qbZjlUi2nfnU+04kbGU8GNxb0VnJXg38mMHCDIM+XS0jSzGasM0GStQ871ng+mhrQS
gmD0X7WnB6BEg/um4bpB2esPeX6ETCSzmgaZKfl37oBUIqGL6zNAAdWEGeQwkEYYXPI3o8HWPmzg
d3mdZSWOzmp537ulz1tn3JJ3pcj7ezxn9tqzXw==
</ds:Modulus>
<ds:Exponent>AQAB</ds:Exponent>
</ds:RSAKeyValue>
</ds:KeyValue>
<ds:X509Data>
<ds:X509Certificate>
MIIDdTCCAl2gAwIBAgIUU79XEfveueyClDtLkqUlSPZ2o8owDQYJKoZIhvcNAQELBQAwLTErMCkG
A1UEAwwiaWRzZXJ2ZXIuc2Vydml6aWNpZS5pbnRlcm5vLmdvdi5pdDAeFw0xODEwMTkwODM1MDVa
Fw0zODEwMTkwODM1MDVaMC0xKzApBgNVBAMMImlkc2VydmVyLnNlcnZpemljaWUuaW50ZXJuby5n
b3YuaXQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDHraj3iOTCIILTlOzicSEuFt03
kKvQDqGWRd5o7s1W7SP2EtcTmg3xron/sbrLEL/eMUQV/Biz6J4pEGoFpMZQHGxOVypmO7Nc8pkF
ot7yUTApr6Ikuy4cUtbx0g5fkQLNb3upIg0Vg1jSnRXEvUCygr/9EeKCUOi/2ptmOVSLad+dT7Ti
RsZTwY3FvRWcleDfyYwcIMgz5dLSNLMZqwzQZK1DzvWeD6aGtBKCYPRftacHoESD+6bhukHZ6w95
foRMJLOaBpkp+XfugFQioYvrM0AB1YQZ5DCQRhhc8jejwdY+bOB3eZ1lJY7Oannfu6XPW2fcknel
yPt7PGf22rNfAgMBAAGjgYwwgYkwHQYDVR0OBBYEFK3Ah+Do3/zB9XjZ66i4biDpUEbAMGgGA1Ud
EQRhMF+CImlkc2VydmVyLnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXSGOWh0dHBzOi8vaWRzZXJ2
ZXIuc2Vydml6aWNpZS5pbnRlcm5vLmdvdi5pdC9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0BAQsF
AAOCAQEAVtpn/s+lYVf42pAtdgJnGTaSIy8KxHeZobKNYNFEY/XTaZEt9QeV5efUMBVVhxKTTHN0
046DR96WFYXs4PJ9Fpyq6Hmy3k/oUdmHJ1c2bwWF/nZ82CwOO081Yg0GBcfPEmKLUGOBK8T55ncW
+RSZadvWTyhTtQhLUtLKcWyzKB5aS3kEE5LSzR8sw3owln9P41Mz+QtL3WeNESRHW0qoQkFotYXX
W6Rvh69+GyzJLxvq2qd7D1qoJgOMrarshBKKPk+ABaLYoEf/cru4e0RDIp2mD0jkGOGDkn9XUl+3
ddALq/osTki6CEawkhiZEo6ABEAjEWNkH9W3/ZzvJnWo6Q==
</ds:X509Certificate>
</ds:X509Data>
</ds:KeyInfo>
</ds:Signature>

    <IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol urn:oasis:names:tc:SAML:1.1:protocol urn:mace:shibboleth:1.0">

        <Extensions>
            <shibmd:Scope regexp="false">gov.it</shibmd:Scope>
        </Extensions>

        <KeyDescriptor use="signing">
            <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>
MIIDdTCCAl2gAwIBAgIUU79XEfveueyClDtLkqUlSPZ2o8owDQYJKoZIhvcNAQEL
BQAwLTErMCkGA1UEAwwiaWRzZXJ2ZXIuc2Vydml6aWNpZS5pbnRlcm5vLmdvdi5p
dDAeFw0xODEwMTkwODM1MDVaFw0zODEwMTkwODM1MDVaMC0xKzApBgNVBAMMImlk
c2VydmVyLnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXQwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQDHraj3iOTCIILTlOzicSEuFt03kKvQDqGWRd5o7s1W
7SP2EtcTmg3xron/sbrLEL/eMUQV/Biz6J4pEGoFpMZQHGxOVypmO7Nc8pkFot7y
UTApr6Ikuy4cUtbx0g5fkQLNb3upIg0Vg1jSnRXEvUCygr/9EeKCUOi/2ptmOVSL
ad+dT7TiRsZTwY3FvRWcleDfyYwcIMgz5dLSNLMZqwzQZK1DzvWeD6aGtBKCYPRf
tacHoESD+6bhukHZ6w95foRMJLOaBpkp+XfugFQioYvrM0AB1YQZ5DCQRhhc8jej
wdY+bOB3eZ1lJY7Oannfu6XPW2fcknelyPt7PGf22rNfAgMBAAGjgYwwgYkwHQYD
VR0OBBYEFK3Ah+Do3/zB9XjZ66i4biDpUEbAMGgGA1UdEQRhMF+CImlkc2VydmVy
LnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXSGOWh0dHBzOi8vaWRzZXJ2ZXIuc2Vy
dml6aWNpZS5pbnRlcm5vLmdvdi5pdC9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0B
AQsFAAOCAQEAVtpn/s+lYVf42pAtdgJnGTaSIy8KxHeZobKNYNFEY/XTaZEt9QeV
5efUMBVVhxKTTHN0046DR96WFYXs4PJ9Fpyq6Hmy3k/oUdmHJ1c2bwWF/nZ82CwO
O081Yg0GBcfPEmKLUGOBK8T55ncW+RSZadvWTyhTtQhLUtLKcWyzKB5aS3kEE5LS
zR8sw3owln9P41Mz+QtL3WeNESRHW0qoQkFotYXXW6Rvh69+GyzJLxvq2qd7D1qo
JgOMrarshBKKPk+ABaLYoEf/cru4e0RDIp2mD0jkGOGDkn9XUl+3ddALq/osTki6
CEawkhiZEo6ABEAjEWNkH9W3/ZzvJnWo6Q==
                        </ds:X509Certificate>
                    </ds:X509Data>
            </ds:KeyInfo>

        </KeyDescriptor>
        <KeyDescriptor use="encryption">
            <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>
MIIDdTCCAl2gAwIBAgIUegfFpjtEsLaV0IL3qBEa0u81rGkwDQYJKoZIhvcNAQEL
BQAwLTErMCkGA1UEAwwiaWRzZXJ2ZXIuc2Vydml6aWNpZS5pbnRlcm5vLmdvdi5p
dDAeFw0xODEwMTkwODM1MDZaFw0zODEwMTkwODM1MDZaMC0xKzApBgNVBAMMImlk
c2VydmVyLnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXQwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQCe9W63GohPUaNbsoluWsVWfmtIyAIufqpmzYS4TiBv
E6l9LlDITsmShVBpiLPU4IDdvoPPBlDqgotofCnSjQxRhGky7tiy+pBObo13lN6d
03GgXNPZqZ+vKJinf8AmNe2UZ1ZbuvUtgS6+vx6P52/KNKx6YuDNmR3lLDhKZVDb
2wwR5qfsdnJIAORbJVWd8kI6GGhmrsmha7zARd0W+ueDtd/WLuAg3G7QWRocHPlP
TN/dPUbKS4O0cnJx0M5UERQ12PIdy641ps6P1v2OatpfSmZp/IlDLKJj9O9V49LM
nxF3VBJkTep2UQsQUc3rlelN2rYAlhURQQzRwpWO5WJvAgMBAAGjgYwwgYkwHQYD
VR0OBBYEFAQDr+o8YMapC4lje9upfeiwmFdtMGgGA1UdEQRhMF+CImlkc2VydmVy
LnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXSGOWh0dHBzOi8vaWRzZXJ2ZXIuc2Vy
dml6aWNpZS5pbnRlcm5vLmdvdi5pdC9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0B
AQsFAAOCAQEAb7gRYzTPEMQjQKiwI4/NdhzzaoKQjp2tu3UPZwsUHruyCbI+B/0k
C2SaSBaAKGT66yN9bPY2Vj4FuxtYmLSZZnatydF19hSu+lExCySKt16GBJ+D5HN7
OmVizRvJNE4+RF0bajpeXnMottLrcL5Ry/BivpxdnIQ9th2sMc7ev0IZtIGYCxGg
c5SAJCz4zuCcNiPANHDPdoxYEQ9EV9PNAUx8q9tjAhoRRiT2ovqT+Dowqax0AVOP
hRY5rA8WMccWAedO8iSSO8DTWomtoOKS9vjWrQxnsHaT8GXohC2OYgSdKsBchvjS
i1RIVkrqHoSHIK2XQapkl8YmD75JjrGNNA==
                        </ds:X509Certificate>
                    </ds:X509Data>
            </ds:KeyInfo>

        </KeyDescriptor>

        <ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:1.0:bindings:SOAP-binding" Location="https://idserver.servizicie.interno.gov.it:443/idp/profile/SAML1/SOAP/ArtifactResolution" index="1"/>
        <ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location="https://idserver.servizicie.interno.gov.it:443/idp/profile/SAML2/SOAP/ArtifactResolution" index="2"/>

        <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/Redirect/SLO"/>
        <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST/SLO"/>
        <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign" Location="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST-SimpleSign/SLO"/>
        <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location="https://idserver.servizicie.interno.gov.it:8443/idp/profile/SAML2/SOAP/SLO"/>

        <SingleSignOnService Binding="urn:mace:shibboleth:1.0:profiles:AuthnRequest" Location="https://idserver.servizicie.interno.gov.it/idp/profile/Shibboleth/SSO"/>
        <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST/SSO"/>
        <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign" Location="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST-SimpleSign/SSO"/>
        <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/Redirect/SSO"/>

    </IDPSSODescriptor>


    <AttributeAuthorityDescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:1.1:protocol">

        <Extensions>
            <shibmd:Scope regexp="false">gov.it</shibmd:Scope>
        </Extensions>


        <KeyDescriptor use="signing">
            <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>
MIIDdTCCAl2gAwIBAgIUU79XEfveueyClDtLkqUlSPZ2o8owDQYJKoZIhvcNAQEL
BQAwLTErMCkGA1UEAwwiaWRzZXJ2ZXIuc2Vydml6aWNpZS5pbnRlcm5vLmdvdi5p
dDAeFw0xODEwMTkwODM1MDVaFw0zODEwMTkwODM1MDVaMC0xKzApBgNVBAMMImlk
c2VydmVyLnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXQwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQDHraj3iOTCIILTlOzicSEuFt03kKvQDqGWRd5o7s1W
7SP2EtcTmg3xron/sbrLEL/eMUQV/Biz6J4pEGoFpMZQHGxOVypmO7Nc8pkFot7y
UTApr6Ikuy4cUtbx0g5fkQLNb3upIg0Vg1jSnRXEvUCygr/9EeKCUOi/2ptmOVSL
ad+dT7TiRsZTwY3FvRWcleDfyYwcIMgz5dLSNLMZqwzQZK1DzvWeD6aGtBKCYPRf
tacHoESD+6bhukHZ6w95foRMJLOaBpkp+XfugFQioYvrM0AB1YQZ5DCQRhhc8jej
wdY+bOB3eZ1lJY7Oannfu6XPW2fcknelyPt7PGf22rNfAgMBAAGjgYwwgYkwHQYD
VR0OBBYEFK3Ah+Do3/zB9XjZ66i4biDpUEbAMGgGA1UdEQRhMF+CImlkc2VydmVy
LnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXSGOWh0dHBzOi8vaWRzZXJ2ZXIuc2Vy
dml6aWNpZS5pbnRlcm5vLmdvdi5pdC9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0B
AQsFAAOCAQEAVtpn/s+lYVf42pAtdgJnGTaSIy8KxHeZobKNYNFEY/XTaZEt9QeV
5efUMBVVhxKTTHN0046DR96WFYXs4PJ9Fpyq6Hmy3k/oUdmHJ1c2bwWF/nZ82CwO
O081Yg0GBcfPEmKLUGOBK8T55ncW+RSZadvWTyhTtQhLUtLKcWyzKB5aS3kEE5LS
zR8sw3owln9P41Mz+QtL3WeNESRHW0qoQkFotYXXW6Rvh69+GyzJLxvq2qd7D1qo
JgOMrarshBKKPk+ABaLYoEf/cru4e0RDIp2mD0jkGOGDkn9XUl+3ddALq/osTki6
CEawkhiZEo6ABEAjEWNkH9W3/ZzvJnWo6Q==
                        </ds:X509Certificate>
                    </ds:X509Data>
            </ds:KeyInfo>

        </KeyDescriptor>
        <KeyDescriptor use="encryption">
            <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>
MIIDdTCCAl2gAwIBAgIUegfFpjtEsLaV0IL3qBEa0u81rGkwDQYJKoZIhvcNAQEL
BQAwLTErMCkGA1UEAwwiaWRzZXJ2ZXIuc2Vydml6aWNpZS5pbnRlcm5vLmdvdi5p
dDAeFw0xODEwMTkwODM1MDZaFw0zODEwMTkwODM1MDZaMC0xKzApBgNVBAMMImlk
c2VydmVyLnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXQwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQCe9W63GohPUaNbsoluWsVWfmtIyAIufqpmzYS4TiBv
E6l9LlDITsmShVBpiLPU4IDdvoPPBlDqgotofCnSjQxRhGky7tiy+pBObo13lN6d
03GgXNPZqZ+vKJinf8AmNe2UZ1ZbuvUtgS6+vx6P52/KNKx6YuDNmR3lLDhKZVDb
2wwR5qfsdnJIAORbJVWd8kI6GGhmrsmha7zARd0W+ueDtd/WLuAg3G7QWRocHPlP
TN/dPUbKS4O0cnJx0M5UERQ12PIdy641ps6P1v2OatpfSmZp/IlDLKJj9O9V49LM
nxF3VBJkTep2UQsQUc3rlelN2rYAlhURQQzRwpWO5WJvAgMBAAGjgYwwgYkwHQYD
VR0OBBYEFAQDr+o8YMapC4lje9upfeiwmFdtMGgGA1UdEQRhMF+CImlkc2VydmVy
LnNlcnZpemljaWUuaW50ZXJuby5nb3YuaXSGOWh0dHBzOi8vaWRzZXJ2ZXIuc2Vy
dml6aWNpZS5pbnRlcm5vLmdvdi5pdC9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0B
AQsFAAOCAQEAb7gRYzTPEMQjQKiwI4/NdhzzaoKQjp2tu3UPZwsUHruyCbI+B/0k
C2SaSBaAKGT66yN9bPY2Vj4FuxtYmLSZZnatydF19hSu+lExCySKt16GBJ+D5HN7
OmVizRvJNE4+RF0bajpeXnMottLrcL5Ry/BivpxdnIQ9th2sMc7ev0IZtIGYCxGg
c5SAJCz4zuCcNiPANHDPdoxYEQ9EV9PNAUx8q9tjAhoRRiT2ovqT+Dowqax0AVOP
hRY5rA8WMccWAedO8iSSO8DTWomtoOKS9vjWrQxnsHaT8GXohC2OYgSdKsBchvjS
i1RIVkrqHoSHIK2XQapkl8YmD75JjrGNNA==
                        </ds:X509Certificate>
                    </ds:X509Data>
            </ds:KeyInfo>

        </KeyDescriptor>

        <AttributeService Binding="urn:oasis:names:tc:SAML:1.0:bindings:SOAP-binding" Location="https://idserver.servizicie.interno.gov.it:443/idp/profile/SAML1/SOAP/AttributeQuery"/>

    </AttributeAuthorityDescriptor>

</EntityDescriptor>`;
