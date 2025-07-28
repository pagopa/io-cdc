export const idpsMetadata = `
<?xml version="1.0" encoding="UTF-8"?>
<md:EntitiesDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ID="_34aadd11-e3d9-4311-a410-4039de088446" Name="https://idps.spid.gov.it">
    <ds:Signature>
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
            <ds:Reference URI="">
                <ds:Transforms>
                    <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                    <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                </ds:Transforms>
                <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                <ds:DigestValue>1+07YT1mHyXzGy7HoEORm3B3oTkEFhFhlLj+3L+b5zM=</ds:DigestValue>
            </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue>AFgDH1NTIuOaGLZ+hraHjxQHfXbRr+Vd44Qu6ZfOPfJZPQAeckW64L7fO+4MWDO3
wxApWKahjlK13E/9nTjrAwJDLLk/n1tWDOvc3M1haaam7jjOzNG1LbMGbfh3ZB2X
4RsHVz2Ag+AJW1KhLhefhDoDg7MrI1+mJl54jzOWYqOhEARkYSUR42J1SCblOaZ1
uwFjxRY2mNwxnUCPXb4xqnEFUfUvVW0DAQBsYchz41AAjSZwT950aIGt1y/VywYM
rHZwkPPY9nyZbC71kvNmMmaD5BExIu130XS4yNcsKqj/A39MA3MLQOHhBeQ8qPxg
iSKZzuwx7Ns/VuPvcLOVunUK0HaDIFifubDDzL4cX3myBzWhZKBP96+OdsNW52VZ
JE5LzxjTyUMnONw/oUQGZnuvA4owYOJilQ5mBUAhFHrqb0NypkkcAYNeTpFxCivt
pvEB03UowmZK7x9dSVqobAXLZLRn8B3OpOwqVwlwbseT/+gvGCoaSv/DpVO4cS9I
gE6mAXNifqXNQLhPVx3YBIgHO5BMY1ICimuRwCjVG/GWAANMhtDZI1cNBjlvC+dl
GqYbbDmNDzZvZDgA1P9+5oY5VdZhFBFMiD8M7PXVN1jjfWL2bNJr7rzmxraFSPqJ
ZaA97USd0nVa+bq3ZtWmnuGwZJUAcditnlIrmDDk1QM=</ds:SignatureValue>
        <ds:KeyInfo>
            <ds:KeyValue>
<ds:RSAKeyValue>
<ds:Modulus>
n+PVtmiHbdDyj6WnLWKvAly2/nLiEUOCxLloNllz+wtOs0Wn4gMq6wbkSAI9j3uO
khGGH0m1ltz5buqLKi8+jHgl/qnLbgZ9Up65tq97hEaAe9kutzlSYu6ZzT8m4FD0
1lg6ZDpXjrBDGWiO7CqOy5lQmron6tNa42JG/hsett+WsI8Wgukh/5cHFGu4gLq6
D7lQXoj+K5r/qIhv6+/Be8la+0ZjLnaGqOAs3QcnkGdkyNDjmIFDvERBWyIyHrGX
kct0/Jqpg+PdBCBD9V1HNRHi1ehhpCrvVphyugWtrV9wgq77BHZqIHZc/Fy58nFf
bId5sNTxoLUY/qJtpMwBnHXk70e/dxoIAxlHQOFx2FOMYFhGADCTTPClCaagxnaS
/P499DoYgTKI+Do3QRy2hPNOmQv54WqYV35wNUAW2JobLN2hSNY8okJZgSohRKdb
c5ZegmsBDkSSeE52RsfqxWvYwZ8UShot7gf02325y8+c1ZMAnzMl6Ja+SdWgjm6Y
1g5RYLUtd7+WyhCFtY0AGlGIZyrXCFdb53jkAqGMd5/mdpnIY3Zlky5/fYWhGOra
BeQaQrsBvHVybq67+s90xMsrO1Ul1GCXNAyn+JtuFm4Vk7TaOMvpcQ6HhBAXaKox
DwLxpT1MUttbPWK564jf7swveWshSzYAxX2jf941lIs=
</ds:Modulus>
<ds:Exponent>
AQAB
</ds:Exponent>
</ds:RSAKeyValue>
</ds:KeyValue>
            <ds:X509Data>
                <ds:X509Certificate>MIIHgzCCBWugAwIBAgIIT5boMmgJZQQwDQYJKoZIhvcNAQENBQAwgcwxCzAJBgNV
BAYTAklUMQ0wCwYDVQQHDARSb21lMSYwJAYDVQQKDB1BZ2VuemlhIHBlciBsJ0l0
YWxpYSBEaWdpdGFsZTEwMC4GA1UECwwnU2Vydml6aW8gQWNjcmVkaXRhbWVudG8g
ZSBwcm9nZXR0byBTUElEMQ0wCwYDVQQDDARBZ0lEMSkwJwYJKoZIhvcNAQkBFhpw
cm90b2NvbGxvQHBlYy5hZ2lkLmdvdi5pdDEaMBgGA1UEBRMRVkFUSVQtOTc3MzUw
MjA1ODQwHhcNMjAwMjE4MDAwMDAwWhcNNDAwMjE3MjM1OTU5WjCB1TELMAkGA1UE
BhMCSVQxDTALBgNVBAcMBFJvbWUxJjAkBgNVBAoMHUFnZW56aWEgcGVyIGwnSXRh
bGlhIERpZ2l0YWxlMTAwLgYDVQQLDCdTZXJ2aXppbyBBY2NyZWRpdGFtZW50byBl
IHByb2dldHRvIFNQSUQxFjAUBgNVBAMMDVByb2dldHRvIFNQSUQxKTAnBgkqhkiG
9w0BCQEWGnByb3RvY29sbG9AcGVjLmFnaWQuZ292Lml0MRowGAYDVQQFExFWQVRJ
VC05NzczNTAyMDU4NDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAJ/j
1bZoh23Q8o+lpy1irwJctv5y4hFDgsS5aDZZc/sLTrNFp+IDKusG5EgCPY97jpIR
hh9JtZbc+W7qiyovPox4Jf6py24GfVKeubave4RGgHvZLrc5UmLumc0/JuBQ9NZY
OmQ6V46wQxlojuwqjsuZUJq6J+rTWuNiRv4bHrbflrCPFoLpIf+XBxRruIC6ug+5
UF6I/iua/6iIb+vvwXvJWvtGYy52hqjgLN0HJ5BnZMjQ45iBQ7xEQVsiMh6xl5HL
dPyaqYPj3QQgQ/VdRzUR4tXoYaQq71aYcroFra1fcIKu+wR2aiB2XPxcufJxX2yH
ebDU8aC1GP6ibaTMAZx15O9Hv3caCAMZR0DhcdhTjGBYRgAwk0zwpQmmoMZ2kvz+
PfQ6GIEyiPg6N0EctoTzTpkL+eFqmFd+cDVAFtiaGyzdoUjWPKJCWYEqIUSnW3OW
XoJrAQ5EknhOdkbH6sVr2MGfFEoaLe4H9Nt9ucvPnNWTAJ8zJeiWvknVoI5umNYO
UWC1LXe/lsoQhbWNABpRiGcq1whXW+d45AKhjHef5naZyGN2ZZMuf32FoRjq2gXk
GkK7Abx1cm6uu/rPdMTLKztVJdRglzQMp/ibbhZuFZO02jjL6XEOh4QQF2iqMQ8C
8aU9TFLbWz1iueuI3+7ML3lrIUs2AMV9o3/eNZSLAgMBAAGjggFcMIIBWDAMBgNV
HRMBAf8EAjAAMB0GA1UdDgQWBBRPcCh3ZPMBNee968zNv4p5E+YXKzAfBgNVHSME
GDAWgBSfx1tsJaanm4NepvvB/qN5O82PkTAOBgNVHQ8BAf8EBAMCBkAwQwYDVR0f
BDwwOjA4oDagNIYyaHR0cHM6Ly93d3cvZWlkYXMuYWdpZC5nb3YuaXQvY3JsL2Ny
bF9zdWJDQV9TQS5jcmwwgbIGA1UdIASBqjCBpzBMBgMrTBAwRTBDBggrBgEFBQcC
ARY3aHR0cHM6Ly9laWRhcy5hZ2lkLmdvdi5pdC9jcHMvQWdJRF9lSURBU19yb290
Q0FfY3BzLnBkZjBXBgQrTBAEME8wTQYIKwYBBQUHAgIwQRo/R292ZXJubWVudCBw
cm9qZWN0IFNpc3RlbWEgUHViYmxpY28gZGkgSWRlbnRpdOAgRGlnaXRhbGUgKFNQ
SUQpMA0GCSqGSIb3DQEBDQUAA4ICAQCwe96Wz6JaFRjtKkokVX58GuMgAVBdMi/Y
HiTwzb3RB0O7ZN27bLYXQA+r3jiYSNpOxGnmB78dxZDzHUbiLcuv8s6z1o1asMNJ
3L+Llr1/oDN5ogrJUoUlBmXTAHeFdVtooFchJS8FhAOcpq5NjJ1timuIU1c5ENE9
VRAy1C6WyiJ2hl6A+BtiaFtDotBXNp2DzK6P7HtBU1pAn+zCWXWa3/ba9UkPGdM2
LNQb5YvsqmRVtB0q4DuuCb3F6RS4/kz+dMQ79YG+NQ7z48F4JHjQDEmxsB6R2H1L
T1sbj0+fOfbRoA+hM4M5lShSj/q8OgrjnJTwWz9OobOYCAyDhCH2AlZLP499Wprj
INkvHtAOJh+jrJ0RTqTf99vU0P1q74hRMNLhDG9PRIyRz5BI0KlCOZGqqyRWVXxV
bYI2I2WgbqSpqyFsAF/spuHuEWJCFpLWl8nBgJ6pucGmVbt5Z6XxBtg0yEvqQLle
EYAnxUiOQBAz44KtPIeuYBGqcn5Ou/+uDesi241fxzgsF0CbOwofBdjCWgBo4bpS
nO3LWUvLW4Vvwmfh2mWaDZE/xMSSzfF8krP0kyTWVwBDi628YazoK4Vr+Gr0gOtG
ZysYIKFl8vIZ4yx3Cd/XLC3/Fqy+KL7N3OnX2XYKDskk+GdzW89Q8THQvIFW7hf7
DjpJriU2/Q==</ds:X509Certificate>
            </ds:X509Data>
        </ds:KeyInfo>
    </ds:Signature>
    <!-- ARUBA ID *start* -->
    <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" ID="_895d61ef-8ac1-4a80-81bc-3469cf2d6683" entityID="https://loginspid.aruba.it">
        <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:SignedInfo>
                <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
                <ds:Reference URI="#_895d61ef-8ac1-4a80-81bc-3469cf2d6683">
                    <ds:Transforms>
                        <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                        <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                    </ds:Transforms>
                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                    <ds:DigestValue>Rgz8nwzHgpdUxx/WBdPgPzYiotGNzUwwlwW46zCd7dY=</ds:DigestValue>
                </ds:Reference>
            </ds:SignedInfo>
            <ds:SignatureValue>HFR/inyn/yV0h/tvUqMhJhbWuosEf8NMzO2AqH7RLtGVrLn4L1ZrOTT1iiY08jf94uQQuMhFdPaFjkAoZIJyeW7GxNjSu5r+9E8fmlkxV3KXzfStDserIAmMQ93onAeMOx8kYJ1GQ9U34zYDfDTp+Gtwwei0kbR1AU6R8xv4WHJ3+rndTJbFawEiNNzd6HvNlHd/yjl3jgBIucDDjRJOcv7frjMWap5nmNJwhkny98pNzYkWhDpEOkZLqHn3g1yJgDpm+e6BtUSsVKl96fLgVUbePWfTQG/wckz76gwK4oLM6LLRwx9F70d7Wa7FPBjmaoTVrO/olq3g1D7MQU7Zug==</ds:SignatureValue>
            <ds:KeyInfo>
                <ds:X509Data>
                    <ds:X509Certificate>MIIExTCCA62gAwIBAgIQH32A70kY92tuXB8AGi2DdDANBgkqhkiG9w0BAQsFADBsMQswCQYDVQQG EwJJVDEYMBYGA1UECgwPQXJ1YmFQRUMgUy5wLkEuMSEwHwYDVQQLDBhDZXJ0aWZpY2F0aW9uIEF1 dGhvcml0eUIxIDAeBgNVBAMMF0FydWJhUEVDIFMucC5BLiBORyBDQSAyMB4XDTIwMDEyMjAwMDAw MFoXDTI1MDEyMTIzNTk1OVowgaAxCzAJBgNVBAYTAklUMRYwFAYDVQQKDA1BcnViYSBQRUMgc3Bh MREwDwYDVQQLDAhQcm9kb3R0bzEWMBQGA1UEAwwNcGVjLml0IHBlYy5pdDEZMBcGA1UEBRMQWFhY WFhYMDBYMDBYMDAwWDEPMA0GA1UEKgwGcGVjLml0MQ8wDQYDVQQEDAZwZWMuaXQxETAPBgNVBC4T CDIwODc2Mzc5MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqt2oHJhcp03l73p+QYpE J+f3jYYj0W0gos0RItZx/w4vpsiKBygaqDNVWSwfo1aPdVDIX13f62O+lBki29KTt+QWv5K6SGHD UXYPntRdEQlicIBh2Z0HfrM7fDl+xeJrMp1s4dsSQAuB5TJOlFZq7xCQuukytGWBTvjfcN/os5aE sEg+RbtZHJR26SbbUcIqWb27Swgj/9jwK+tvzLnP4w8FNvEOrNfR0XwTMNDFrwbOCuWgthv5jNBs VZaoqNwiA/MxYt+gTOMj/o5PWKk8Wpm6o/7/+lWAoxh0v8x9OkbIi+YaFpIxuCcUqsrJJk63x2gH Cc2nr+yclYUhsKD/AwIDAQABo4IBLDCCASgwDgYDVR0PAQH/BAQDAgeAMB0GA1UdDgQWBBTKQ3+N PGcXFk8nX994vMTVpba1EzBHBgNVHSAEQDA+MDwGCysGAQQBgegtAQEBMC0wKwYIKwYBBQUHAgEW H2h0dHBzOi8vY2EuYXJ1YmFwZWMuaXQvY3BzLmh0bWwwWAYDVR0fBFEwTzBNoEugSYZHaHR0cDov L2NybC5hcnViYXBlYy5pdC9BcnViYVBFQ1NwQUNlcnRpZmljYXRpb25BdXRob3JpdHlCL0xhdGVz dENSTC5jcmwwHwYDVR0jBBgwFoAU8v9jQBwRQv3M3/FZ9m7omYcxR3kwMwYIKwYBBQUHAQEEJzAl MCMGCCsGAQUFBzABhhdodHRwOi8vb2NzcC5hcnViYXBlYy5pdDANBgkqhkiG9w0BAQsFAAOCAQEA ZKpor1MrrYwPw+IuPZElQAuNzXsaSWSnn/QQwJtW49c4rFM4mEud9c61p9XxIIbgQKmDmNbzC+Dm wJSZ8ILdCAyBHmY3BehVRAy3KRA2KQhS9kd4vywf5KVYd1L5hQa9DBrusxF7i1X/SEeLQgoKkov0 R8v43UncqXS/ql50ovJFxi938Rv4rVwa8o0hqqc6WUcjkidB6M9aNJLIbOZN3xNUgC28qIr8y7N8 lbxWbwVrGxqKDtpaA9J0hOOXxwuTfSd1zOtT0KSSSUQ53QGOPnxyjxYDQbJu60/lBPuUV5wb/Z2r gpeUH1/n7limHV5sVmOZgSnf18T+0STANCfkXg==</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </ds:Signature>
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:X509Data>
                        <ds:X509Certificate>MIIExTCCA62gAwIBAgIQH32A70kY92tuXB8AGi2DdDANBgkqhkiG9w0BAQsFADBsMQswCQYDVQQG EwJJVDEYMBYGA1UECgwPQXJ1YmFQRUMgUy5wLkEuMSEwHwYDVQQLDBhDZXJ0aWZpY2F0aW9uIEF1 dGhvcml0eUIxIDAeBgNVBAMMF0FydWJhUEVDIFMucC5BLiBORyBDQSAyMB4XDTIwMDEyMjAwMDAw MFoXDTI1MDEyMTIzNTk1OVowgaAxCzAJBgNVBAYTAklUMRYwFAYDVQQKDA1BcnViYSBQRUMgc3Bh MREwDwYDVQQLDAhQcm9kb3R0bzEWMBQGA1UEAwwNcGVjLml0IHBlYy5pdDEZMBcGA1UEBRMQWFhY WFhYMDBYMDBYMDAwWDEPMA0GA1UEKgwGcGVjLml0MQ8wDQYDVQQEDAZwZWMuaXQxETAPBgNVBC4T CDIwODc2Mzc5MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqt2oHJhcp03l73p+QYpE J+f3jYYj0W0gos0RItZx/w4vpsiKBygaqDNVWSwfo1aPdVDIX13f62O+lBki29KTt+QWv5K6SGHD UXYPntRdEQlicIBh2Z0HfrM7fDl+xeJrMp1s4dsSQAuB5TJOlFZq7xCQuukytGWBTvjfcN/os5aE sEg+RbtZHJR26SbbUcIqWb27Swgj/9jwK+tvzLnP4w8FNvEOrNfR0XwTMNDFrwbOCuWgthv5jNBs VZaoqNwiA/MxYt+gTOMj/o5PWKk8Wpm6o/7/+lWAoxh0v8x9OkbIi+YaFpIxuCcUqsrJJk63x2gH Cc2nr+yclYUhsKD/AwIDAQABo4IBLDCCASgwDgYDVR0PAQH/BAQDAgeAMB0GA1UdDgQWBBTKQ3+N PGcXFk8nX994vMTVpba1EzBHBgNVHSAEQDA+MDwGCysGAQQBgegtAQEBMC0wKwYIKwYBBQUHAgEW H2h0dHBzOi8vY2EuYXJ1YmFwZWMuaXQvY3BzLmh0bWwwWAYDVR0fBFEwTzBNoEugSYZHaHR0cDov L2NybC5hcnViYXBlYy5pdC9BcnViYVBFQ1NwQUNlcnRpZmljYXRpb25BdXRob3JpdHlCL0xhdGVz dENSTC5jcmwwHwYDVR0jBBgwFoAU8v9jQBwRQv3M3/FZ9m7omYcxR3kwMwYIKwYBBQUHAQEEJzAl MCMGCCsGAQUFBzABhhdodHRwOi8vb2NzcC5hcnViYXBlYy5pdDANBgkqhkiG9w0BAQsFAAOCAQEA ZKpor1MrrYwPw+IuPZElQAuNzXsaSWSnn/QQwJtW49c4rFM4mEud9c61p9XxIIbgQKmDmNbzC+Dm wJSZ8ILdCAyBHmY3BehVRAy3KRA2KQhS9kd4vywf5KVYd1L5hQa9DBrusxF7i1X/SEeLQgoKkov0 R8v43UncqXS/ql50ovJFxi938Rv4rVwa8o0hqqc6WUcjkidB6M9aNJLIbOZN3xNUgC28qIr8y7N8 lbxWbwVrGxqKDtpaA9J0hOOXxwuTfSd1zOtT0KSSSUQ53QGOPnxyjxYDQbJu60/lBPuUV5wb/Z2r gpeUH1/n7limHV5sVmOZgSnf18T+0STANCfkXg==</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:X509Data>
                        <ds:X509Certificate>MIIExTCCA62gAwIBAgIQIHtEvEhGM77HwqsuvSbi9zANBgkqhkiG9w0BAQsFADBsMQswCQYDVQQG EwJJVDEYMBYGA1UECgwPQXJ1YmFQRUMgUy5wLkEuMSEwHwYDVQQLDBhDZXJ0aWZpY2F0aW9uIEF1 dGhvcml0eUIxIDAeBgNVBAMMF0FydWJhUEVDIFMucC5BLiBORyBDQSAyMB4XDTE3MDEyMzAwMDAw MFoXDTIwMDEyMzIzNTk1OVowgaAxCzAJBgNVBAYTAklUMRYwFAYDVQQKDA1BcnViYSBQRUMgc3Bh MREwDwYDVQQLDAhQcm9kb3R0bzEWMBQGA1UEAwwNcGVjLml0IHBlYy5pdDEZMBcGA1UEBRMQWFhY WFhYMDBYMDBYMDAwWDEPMA0GA1UEKgwGcGVjLml0MQ8wDQYDVQQEDAZwZWMuaXQxETAPBgNVBC4T CDE2MzQ1MzgzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqt2oHJhcp03l73p+QYpE J+f3jYYj0W0gos0RItZx/w4vpsiKBygaqDNVWSwfo1aPdVDIX13f62O+lBki29KTt+QWv5K6SGHD UXYPntRdEQlicIBh2Z0HfrM7fDl+xeJrMp1s4dsSQAuB5TJOlFZq7xCQuukytGWBTvjfcN/os5aE sEg+RbtZHJR26SbbUcIqWb27Swgj/9jwK+tvzLnP4w8FNvEOrNfR0XwTMNDFrwbOCuWgthv5jNBs VZaoqNwiA/MxYt+gTOMj/o5PWKk8Wpm6o/7/+lWAoxh0v8x9OkbIi+YaFpIxuCcUqsrJJk63x2gH Cc2nr+yclYUhsKD/AwIDAQABo4IBLDCCASgwDgYDVR0PAQH/BAQDAgeAMB0GA1UdDgQWBBTKQ3+N PGcXFk8nX994vMTVpba1EzBHBgNVHSAEQDA+MDwGCysGAQQBgegtAQEBMC0wKwYIKwYBBQUHAgEW H2h0dHBzOi8vY2EuYXJ1YmFwZWMuaXQvY3BzLmh0bWwwWAYDVR0fBFEwTzBNoEugSYZHaHR0cDov L2NybC5hcnViYXBlYy5pdC9BcnViYVBFQ1NwQUNlcnRpZmljYXRpb25BdXRob3JpdHlCL0xhdGVz dENSTC5jcmwwHwYDVR0jBBgwFoAU8v9jQBwRQv3M3/FZ9m7omYcxR3kwMwYIKwYBBQUHAQEEJzAl MCMGCCsGAQUFBzABhhdodHRwOi8vb2NzcC5hcnViYXBlYy5pdDANBgkqhkiG9w0BAQsFAAOCAQEA nEw0NuaspbpDjA5wggwFtfQydU6b3Bw2/KXPRKS2JoqGmx0SYKj+L17A2KUBa2c7gDtKXYz0FLT6 0Bv0pmBN/oYCgVMEBJKqwRwdki9YjEBwyCZwNEx1kDAyyqFEVU9vw/OQfrAdp7MTbuZGFKknVt7b 9wOYy/Op9FiUaTg6SuOy0ep+rqhihltYNAAl4L6fY45mHvqa5vvVG30OvLW/S4uvRYUXYwY6KhWv NdDf5CnFugnuEZtHJrVe4wx9aO5GvFLFZ/mQ35C5mXPQ7nIb0CDdLBJdz82nUoLSA5BUbeXAUkfa hW/hLxLdhks68/TK694xVIuiB40pvMmJwxIyDA==</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://loginspid.aruba.it/ServiceLogoutRequest"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://loginspid.aruba.it/ServiceLogoutRequest"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://loginspid.aruba.it/ServiceLoginWelcome"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://loginspid.aruba.it/ServiceLoginWelcome"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice identificativo SPID" Name="spidCode"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Nome" Name="name"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Cognome" Name="familyName"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Luogo di nascita" Name="placeOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Provincia di nascita" Name="countyOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Data di nascita" Name="dateOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Sesso" Name="gender"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Ragione o denominazione sociale" Name="companyName"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice Fiscale Persona Giuridica" Name="companyFiscalNumber"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Sede legale" Name="registeredOffice"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice fiscale" Name="fiscalNumber"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Partita IVA" Name="ivaCode"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Documento d'identità" Name="idCard"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Numero di telefono mobile" Name="mobilePhone"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Indirizzo di posta elettronica" Name="email"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Domicilio fisico" Name="address"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Indirizzo domicilio fisico" Name="domicileStreetAddress"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="CAP domicilio fisico" Name="domicilePostalCode"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Comune domicilio fisico" Name="domicileMunicipality"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Provincia domicilio fisico" Name="domicileProvince"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Nazione domicilio fisico" Name="domicileNation"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Data di scadenza identità" Name="expirationDate"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Domicilio digitale" Name="digitalAddress"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="it">ArubaPEC S.p.A.</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="it">ArubaPEC S.p.A.</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="it">https://www.pec.it/</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- ARUBA ID *end* -->
    <!-- INFOCERT ID *start* -->
    <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" ID="_728bf4bfcbe0e793ad282a5ddde615c2" cacheDuration="P0Y0M30DT0H0M0.000S" entityID="https://identity.infocert.it"><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI="#_728bf4bfcbe0e793ad282a5ddde615c2"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>+Rel1FMcm+5efYiYZHG/xIlGJABOWQctvg7pKhGM/T8=</DigestValue></Reference></SignedInfo><SignatureValue>HF+4Mag3Cwf70kvV4mggud56QUdiVrhbWXZFMDhhT7UVXMnUg/bas1pcIAR6fZAg+1tInF8lq1Z1Ny0leBGm1uMEwJa1ct8CtT3yCT2kfrlTAFpHymBv3fELAgVkJE09OwWqs9RCGu2IzEWjtIZozEOiG6mSLRiAWRPMk3x6y1oRdsenLqmuvcR1wuRMoFjb+2SP6bxJWWZzzrzAadSX9qbnKKn9qOxFke8Tn5FqQUaeh62RFBregLPT4PlaZsnTOkrdPqjLFYuh6NtBU20Qh2oiH5TdyZ9mfTleJtp9RYwpo472zsXYMbbmDyDr3/wbzFIqZVHqos9PsM+GbXQpTQ==</SignatureValue><KeyInfo><X509Data><X509Certificate>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</X509Certificate></X509Data></KeyInfo></Signature><md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><md:KeyDescriptor use="signing"><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data><ds:X509Certificate>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</ds:X509Certificate></ds:X509Data></ds:KeyInfo></md:KeyDescriptor><md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://identity.infocert.it/spid/samlslo" ResponseLocation="https://identity.infocert.it/spid/samlslo/response"/><md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://identity.infocert.it/spid/samlslo" ResponseLocation="https://identity.infocert.it/spid/samlslo/response"/><md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location="https://identity.infocert.it/spid/samlslo/soap"/><md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://identity.infocert.it/spid/samlsso"/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://identity.infocert.it/spid/samlsso"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Domicilio fisico" Name="address"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Ragione o denominazione sociale" Name="companyName"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Provincia di nascita" Name="countyOfBirth"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Data di nascita" Name="dateOfBirth"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Domicilio digitale" Name="digitalAddress"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Indirizzo di posta elettronica" Name="email"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Data di scadenza identita" Name="expirationDate"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Cognome" Name="familyName"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice fiscale" Name="fiscalNumber"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Sesso" Name="gender"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Documento d'identita" Name="idCard"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Partita IVA" Name="ivaCode"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Numero di telefono mobile" Name="mobilePhone"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Nome" Name="name"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Luogo di nascita" Name="placeOfBirth"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Sede legale" Name="registeredOffice"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice identificativo SPID" Name="spidCode"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Tipologia domicilio fisico" Name="domicileAddressType"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Indirizzo domicilio fisico" Name="domicileStreetAddress"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Nr. Civico domicilio fisico" Name="domicileHouseNumber"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="CAP domicilio fisico" Name="domicilePostalCode"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Comune domicilio fisico" Name="domicileMunicipality"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Provincia domicilio fisico" Name="domicileProvince"/><saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Nazione domicilio fisico" Name="domicileNation"/></md:IDPSSODescriptor><md:Organization><md:OrganizationName xml:lang="it">InfoCert S.p.A.</md:OrganizationName><md:OrganizationName xml:lang="en">InfoCert S.p.A.</md:OrganizationName><md:OrganizationName xml:lang="fr">InfoCert S.p.A.</md:OrganizationName><md:OrganizationName xml:lang="de">InfoCert S.p.A.</md:OrganizationName><md:OrganizationDisplayName xml:lang="it">InfoCert S.p.A.</md:OrganizationDisplayName><md:OrganizationDisplayName xml:lang="en">InfoCert S.p.A.</md:OrganizationDisplayName><md:OrganizationDisplayName xml:lang="fr">InfoCert S.p.A.</md:OrganizationDisplayName><md:OrganizationDisplayName xml:lang="de">InfoCert S.p.A.</md:OrganizationDisplayName><md:OrganizationURL xml:lang="it">https://www.infocert.it</md:OrganizationURL><md:OrganizationURL xml:lang="en">https://www.infocert.it/international/?lang=en</md:OrganizationURL><md:OrganizationURL xml:lang="fr">https://www.infocert.it/international/?lang=fr</md:OrganizationURL><md:OrganizationURL xml:lang="de">https://www.infocert.it/international/?lang=de</md:OrganizationURL></md:Organization></md:EntityDescriptor>
    <!-- INFOCERT ID *end* -->
    <!-- INTESA ID *start* -->
    <md:EntityDescriptor ID="_a04faedb3e1198b61905928ad32d2a79" cacheDuration="P0Y0M30DT0H0M0.000S" entityID="https://spid.intesa.it">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>MIIEDjCCAvagAwIBAgIIIT1A+ywbIQAwDQYJKoZIhvcNAQELBQAwXjEzMDEGA1UE                            AwwqSU4uVEUuUy5BLiBTLnAuQSAtIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRow                            GAYDVQQKDBFJTi5URS5TLkEuIFMucC5BLjELMAkGA1UEBhMCSVQwHhcNMTcwOTE1                            MTMyMzQ1WhcNMzYwNzAxMTk1OTAwWjBQMSUwDwYDVQQuEwgyMDA3OTc5NzASBgNV                            BAMMC1NBTUwgU2lnbmVyMRowGAYDVQQKDBFJTi5URS5TLkEuIFMucC5BLjELMAkG                            A1UEBhMCSVQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDhYXkP+eQB                            URgmslDXBjG0ad+DkSAkWt7hUoaTyiK0e34QiyArq043plqTrt+6FzTGeX7960Qr                            3tCLGCiVOi47QuE09IKfJmKGEaUQnJQehHYZs/XV0OYQl18WrCxUX6ALOcqPs+4y                            pCbJV1WzSosfBcPBzivJER8kvrynMXI3or18e9XPTGBn8qNFyNF1E3BJ5UhrDvk5                            W2gKyYKz0M/CIu9PiHuO/ne6HbeNrCS/xzXtjsTusk41AOxIQoFbEzS08xcRY+QD                            E8oLcAmecSjT3xv3r9dWke6KTTAahS3K+5mOYRcBXj2FFegiUp+xh4OAWdH1+gGD                            Ym+3aAmMpaLtAgMBAAGjgd0wgdowHQYDVR0OBBYEFEw9xWg4qvQGdlGMCqmJcVDg                            dE8aMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUySnWJ2sw0ljDpJVrtrxCCP0b                            1CYwGgYDVR0QBBMwEYAPMjAxNzA5MTUxMzIzNDVaMD8GA1UdHwQ4MDYwNKAyoDCG                            Lmh0dHA6Ly9lLXRydXN0Y29tLmludGVzYS5pdC9DUkwvSU5URVNBX25DQS5jcmww                            DgYDVR0PAQH/BAQDAgSwMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDBDAN                            BgkqhkiG9w0BAQsFAAOCAQEAVRHyFRZZFpW/qjJpKftd86h3wOdUqOhc2W8ZHv0s                            t8ptG+mZk3l1iWAsEPqKMIBhksgTvalnHC1lHUt11xsZ2mzUjVpiG8XiWXYXQnY2                            D+q7Dc4n20kJ717qf4SDN8wX1A6XvT3Wrsfh87vg3ZFD56/eyur2snWu4OilsFqA                            yLhnExG4puJ4JKBWnlwAGXD9SFgkSZ8FC66KQs6CAwVkvCIom3IwJeU/VrYQF6XH                            kVCQgr5mojXgCkrlRNl53WAKfQHCT4QH+oQVP97PCEL/wQ1zi0UzWauKT6u2wDym 9rcpch+WLa0GUtYNhuoLU2SregPKwTWg2DfINJObyWRpww== </ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://spid.intesa.it/Time4UserServices/services/idp/SingleLogout" ResponseLocation="https://spid.intesa.it/Time4UserServices/services/idp/SingleLogout"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://spid.intesa.it/Time4UserServices/services/idp/SingleLogout" ResponseLocation="https://spid.intesa.it/Time4UserServices/services/idp/SingleLogout"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient </md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://spid.intesa.it/Time4UserServices/services/idp/AuthnRequest/"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://spid.intesa.it/Time4UserServices/services/idp/AuthnRequest/"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Domicilio fisico" Name="address"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Ragione o denominazione sociale" Name="companyName"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Provincia di nascita" Name="countyOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Data di nascita" Name="dateOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Domicilio digitale" Name="digitalAddress"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Indirizzo di posta elettronica" Name="email"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Data di scadenza identita" Name="expirationDate"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Cognome" Name="familyName"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice fiscale" Name="fiscalNumber"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Sesso" Name="gender"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Documento d'identita" Name="idCard"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Partita IVA" Name="ivaCode"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Numero di telefono mobile" Name="mobilePhone"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Nome" Name="name"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Luogo di nascita" Name="placeOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Sede legale" Name="registeredOffice"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" FriendlyName="Codice identificativo SPID" Name="spidCode"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="it">IN.TE.S.A. S.p.A.</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="it"> Intesa S.p.A.</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="it">https://www.intesa.it/ </md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- INTESA ID *end* -->
    <!-- LEPIDA *start* -->
    <md:EntityDescriptor xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xs="http://www.w3.org/2001/XMLSchemainstance" entityID="https://id.lepida.it/idp/shibboleth">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>                            MIIDHDCCAgSgAwIBAgIVALisbudTRxLy3vlMcEDfaqr3iW89MA0GCSqGSIb3DQEB                            CwUAMBcxFTATBgNVBAMMDGlkLmxlcGlkYS5pdDAeFw0xODA4MDgxMDIzMTJaFw0z                            ODA4MDgxMDIzMTJaMBcxFTATBgNVBAMMDGlkLmxlcGlkYS5pdDCCASIwDQYJKoZI                            hvcNAQEBBQADggEPADCCAQoCggEBAMOFERgxPEYPqAjN7oW6y8oSSY6tGm2OCIU+                            VyKhb2OqfNLpF8tPrytX17pgwVYHzjxRCNMTC83frbmtBapABtm9KuX7qaSPvaJx                            0+UqYk9FdKCKQOEkmWcNOJfwzNMP65B+cDxP3sa1JoAMeAO0x95bnYoX0ZHcssKk                            wpgMb8/JHZHzqu3odxADtO5PaT3xaCyMIcqIp1O2nVn7SizUE1gNucLAdaP4kh0o                            7nU61pz4pG3gQXK+uROteDD8cTU2Nxi7W1T73tQSuwst54BS2p9IBXzWrA9V0Ck1                            0oiQTcIC8X9McepCrNzgCOBdap00Tifusb30t74BREARgwjp1N8CAwEAAaNfMF0w                            HQYDVR0OBBYEFL32/n7uf1Re14pW+gwGxZQHUZBCMDwGA1UdEQQ1MDOCDGlkLmxl                            cGlkYS5pdIYjaHR0cHM6Ly9pZC5sZXBpZGEuaXQvaWRwL3NoaWJib2xldGgwDQYJ                            KoZIhvcNAQELBQADggEBAK80B1mEWKOTJkVJOJot2xU79Lhs1+domUSYQiA+tlS4                            6IAfWwDZqI1llIjgL85n7qMsKFvYTIskInoG51Iezv2dTxlB6IMI8NPRfiFXo2s8                            NYjbzWyETbdXzCbDR0tKNke0TFE0oxunNfE5YRsmH4bPnjhPUjCSHX7wIhlNrLae                            3FjMQp1OLDs7HmJo3AhuAVmHCoG7QV/ly4ZHcVYx4F7HUsFg5uxNYjZbo+XMutJz                            4nZFOFE+uRzTwwfdR2sxny+ppkruTwIhEXyzknoiw1mGIEWZc6scnOAiwZeqTccU YVNHp+PSFs9SD8l+2PO4Oh8Y3dYT+5ojv+S6T7vy5xE= </ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://id.lepida.it/idp/profile/SAML2/POST/SLO"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://id.lepida.it/idp/profile/SAML2/Redirect/SLO"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://id.lepida.it/idp/profile/SAML2/POST/SSO"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://id.lepida.it/idp/profile/SAML2/Redirect/SSO"/>
            <saml2:Attribute FriendlyName="Codice identificativo SPID" Name="spidCode" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Nome" Name="name" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Cognome" Name="familyName" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Luogo di nascita" Name="placeOfBirth" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Provincia di nascita" Name="countyOfBirth" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Data di nascita" Name="dateOfBirth" xs:type="xs:date"/>
            <saml2:Attribute FriendlyName="Sesso" Name="gender" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Ragione o denominazione sociale" Name="companyName" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Sede legale" Name="registeredOffice" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Codice fiscale" Name="fiscalNumber" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Partita IVA" Name="ivaCode" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Documento d'identità" Name="idCard" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Numero di telefono mobile" Name="mobilePhone" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Indirizzo di posta elettronica" Name="email" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Domicilio fisico" Name="address" xs:type="xs:string"/>
            <saml2:Attribute FriendlyName="Data di scadenza identità" Name="expirationDate" xs:type="xs:date"/>
            <saml2:Attribute FriendlyName="Domicilio digitale" Name="digitalAddress" xs:type="xs:string"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="it">Lepida S.p.A.</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="it">Lepida S.p.A.</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="it">https://www.lepida.it/</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- LEPIDA *end* -->
    <!-- NAMIRIAL ID *start* -->
    <md:EntityDescriptor ID="_pfx8cdfef6c-7dff-4e1c-a9eb-2c51cac9d137" entityID="https://idp.namirialtsp.com/idp">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509SubjectName>CN=*.namirialtsp.com,OU=Security Departement,O=Namirial Spa,L=Senigallia,ST=Ancona,C=IT</ds:X509SubjectName>
                        <ds:X509Certificate>MIIDNzCCAh+gAwIBAgIUNGvDUjTpLSPlP4sEfO0+JARITnEwDQYJKoZIhvcNAQEL BQAwHjEcMBoGA1UEAwwTaWRwLm5hbWlyaWFsdHNwLmNvbTAeFw0xNzAzMDgwOTE3 NTZaFw0zNzAzMDgwOTE3NTZaMB4xHDAaBgNVBAMME2lkcC5uYW1pcmlhbHRzcC5j b20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDrcJvYRh49nNijgzwL 1OOwgzeMDUWcMSwoWdtMpx3kDhZwMFQ3ITDmNvlz21I0QKaP0BDg/UAjfCbDtLqU y6wHtI6NWVJoqIziw+dLfg7S5Sr2nOzJ/sKhzadWH1kDsetIenOLU2ex+7Vf/+4P 7nIrS0c+xghi9/zN8dH6+09wWYnloGmcW3qWRFMKJjR3ctBmsmqCKWNIIq2QfeFs zSSeG0xaNlLKBrj6TyPDxDqPAskq038W1fCuh7aejCk7XTTOxuuIwDGJiYsc8rfX SG9/auskAfCziGEm304/ojy5MRcNjekz4KgWxT9anMCipv0I2T7tCAivc1z9QCsE Pk5pAgMBAAGjbTBrMB0GA1UdDgQWBBQi8+cnv0Nw0lbuICzxlSHsvBw5SzBKBgNV HREEQzBBghNpZHAubmFtaXJpYWx0c3AuY29thipodHRwczovL2lkcC5uYW1pcmlh bHRzcC5jb20vaWRwL3NoaWJib2xldGgwDQYJKoZIhvcNAQELBQADggEBAEp953KM WY7wJbJqnPTmDkXaZJVoubcjW86IY494RgVBeZ4XzAGOifa3ScDK6a0OWfIlRTba KKu9lEVw9zs54vLp9oQI4JulomSaL805Glml4bYqtcLoh5qTnKaWp5qvzBgcQ7i2 GcDC9F+qrsJYreCA7rbHXzF0hu5yIfz0BrrCRWvuWiop92WeKvtucI4oBGfoHhYO ZsLuoTT3hZiEFJT60xS5Y2SNdz+Eia9Dgt0cvAzoOVk93Cxg+XBdyyEEiZn/zvhj us29KyFrzh3XYznh+4jq3ymt7Os4JKmY0aJm7yNxw+LyPjkdaB0icfo3+hD7PiuU jC3Y67LUWQ8YgOc=</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://idp.namirialtsp.com/idp/profile/SAML2/POST/SLO"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idp.namirialtsp.com/idp/profile/SAML2/Redirect/SLO"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://idp.namirialtsp.com/idp/profile/SAML2/POST/SSO"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idp.namirialtsp.com/idp/profile/SAML2/Redirect/SSO"/>
            <saml:Attribute FriendlyName="Domicilio fisico" Name="address"/>
            <saml:Attribute FriendlyName="Ragione o denominazione sociale" Name="companyName"/>
            <saml:Attribute FriendlyName="Codice fiscale persona giuridica" Name="companyFiscalNumber"/>
            <saml:Attribute FriendlyName="Provincia di nascita" Name="countyOfBirth"/>
            <saml:Attribute FriendlyName="Data di nascita" Name="dateOfBirth"/>
            <saml:Attribute FriendlyName="Indirizzo domicilio fisico" Name="domicileStreetAddress"/>
            <saml:Attribute FriendlyName="CAP domicilio fisico" Name="domicilePostalCode"/>
            <saml:Attribute FriendlyName="Comune domicilio fisico" Name="domicileMunicipality"/>
            <saml:Attribute FriendlyName="Provincia domicilio fisico" Name="domicileProvince"/>
            <saml:Attribute FriendlyName="Nazione domicilio fisico" Name="domicileNation"/>
            <saml:Attribute FriendlyName="Domicilio digitale" Name="digitalAddress"/>
            <saml:Attribute FriendlyName="Indirizzo di posta elettronica" Name="email"/>
            <saml:Attribute FriendlyName="Data di scadenza identita" Name="expirationDate"/>
            <saml:Attribute FriendlyName="Cognome" Name="familyName"/>
            <saml:Attribute FriendlyName="Codice fiscale" Name="fiscalNumber"/>
            <saml:Attribute FriendlyName="Sesso" Name="gender"/>
            <saml:Attribute FriendlyName="Documento d'identita" Name="idCard"/>
            <saml:Attribute FriendlyName="Partita IVA" Name="ivaCode"/>
            <saml:Attribute FriendlyName="Numero di telefono mobile" Name="mobilePhone"/>
            <saml:Attribute FriendlyName="Nome" Name="name"/>
            <saml:Attribute FriendlyName="Luogo di nascita" Name="placeOfBirth"/>
            <saml:Attribute FriendlyName="Sede legale" Name="registeredOffice"/>
            <saml:Attribute FriendlyName="Codice identificativo SPID" Name="spidCode"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="it">Namirial</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="it">Namirial S.p.a. Trust Service Provider</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="it">https://www.namirialtsp.com</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- NAMIRIAL ID *end* -->
    <!-- POSTE ID *start* -->
    <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" ID="_fc99bae1-fa30-4afe-a428-6dc502976e74" cacheDuration="P0Y0M30DT0H0M0.000S" entityID="https://posteid.poste.it">
        <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
            <SignedInfo>
                <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
                <Reference URI="#_fc99bae1-fa30-4afe-a428-6dc502976e74">
                    <Transforms>
                        <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                        <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                    </Transforms>
                    <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                    <DigestValue>HuZp3BIFRsUQLvzPnebPMaMFL48slyJzdoPJfH96GIk=</DigestValue>
                </Reference>
            </SignedInfo>
            <SignatureValue>DRYpdyQk7aK2mHKUKw3JY6aj71NO0eR8FhnQccA/WOJmUs3uuty3sVn4PGSWf/DrSQ0U6x0Q1pZx IY1+N0/Y4C/sdts5jZCY6TW44BiSPe0jJxuOVq1MaFMsoITIb0Me/aX6s1Sv0EFAXLFWtrrbGJma V2wlJL7E/NQUJqGeNmc1Y8DrdBRzPwsMNi7NVHewx89F/raOL1y5Fr4m7NF7ES1XG9bpV/eVyeYj pV6sU9JqgZ9nz/JuUvFAoRj8OaWwoyEZo/y7mq46sLPEeCQMLSuRK67vDBsQuZUZu14Oc4lmOUiQ 17jTJh6hBNkpuE3/kEk8P2dgRPtJRvoxzLxpYw==</SignatureValue>
            <KeyInfo>
                <X509Data>
                    <X509Certificate>MIIFgzCCA2ugAwIBAgIIJSppAZKg/XQwDQYJKoZIhvcNAQELBQAwZTELMAkGA1UEBhMCSVQxHjAc BgNVBAoMFVBvc3RlIEl0YWxpYW5lIFMucC5BLjEaMBgGA1UEYQwRVkFUSVQtMDExMTQ2MDEwMDYx GjAYBgNVBAMMEVBvc3RlIEl0YWxpYW5lIENBMB4XDTIxMDIxODExNDYzMVoXDTI0MDIxOTExNDYz MVowQzELMAkGA1UEBhMCSVQxHjAcBgNVBAoMFVBvc3RlIEl0YWxpYW5lIFMucC5BLjEUMBIGA1UE AwwLaWRwLXBvc3RlaWQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZFEtJoEHFAjpC aZcj5DVWrRDyaLZyu31XApslbo87CyWz61OJMtw6QQU0MdCtrYbtSJ6vJwx7/6EUjsZ3u4x3EPLd lkyiGOqukPwATv4c7TVOUVs5onIqTphM9b+AHRg4ehiMGesm/9d7RIaLuN79iPUvdLn6WP3idAfE w+rhJ/wYEQ0h1Xm5osNUgtWcBGavZIjLssWNrDDfJYxXH3QZ0kI6feEvLCJwgjXLGkBuhFehNhM4 fhbX9iUCWwwkJ3JsP2++Rc/iTA0LZhiUsXNNq7gBcLAJ9UX2V1dWjTzBHevfHspzt4e0VgIIwbDR qsRtF8VUPSDYYbLoqwbLt18XAgMBAAGjggFXMIIBUzA/BggrBgEFBQcBAQQzMDEwLwYIKwYBBQUH MAGGI2h0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvcGktb2NzcENBMB0GA1UdDgQWBBRL64pGUJHw Y7ok6cRMUgXvMBoLMjAfBgNVHSMEGDAWgBRs0025F7hHd0d+ULyAaELPZ7w/eTA+BgNVHSAENzA1 MDMGCCtMMAEFAQEEMCcwJQYIKwYBBQUHAgEWGWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQwOAYD VR0fBDEwLzAtoCugKYYnaHR0cDovL3Bvc3RlY2VydC5wb3N0ZS5pdC9waS1DQS9jcmwuY3JsMA4G A1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwJwYDVR0RBCAwHoEc aWRwLXBvc3RlaWRAcG9zdGVpdGFsaWFuZS5pdDANBgkqhkiG9w0BAQsFAAOCAgEAp0EhITlTx+cO aoXw//nBl6Q4y82MfSGfPJIw3ROV1z3tHBctaksi/RxAzyMD5beO2s8Q6lXx0sLMCcuUQmzHj3eJ bqn+6sIUr000dSlX/iPgVUc2dvPIZZg9xu38J8NvCfrtgAGY5iMVFMd3CZLFw0ybr+Bx/1K/NhQO 7jxn0RSGA1J4mM2syVhEDUODs9kz3T4kXYUofwwvPL1a9xB9RBqbp7plYtbBBdftEORUQrWzH1mz NO4nlFkX9qgVrgFIIJJT2KadHoop1r65O9ffncK14qpNo3eTsNDq3hRlteb7ylmlJ8CoakUWZeXD DP9ZboWxZkyp+9903OrToRvOgeWSc+YrqcRZOv7r6tTALTk4U9OTKDG9/eNWSGQqD7Qd/9rssfF0 uJEGHnbsk/Hvdxn8apgWN1Zwt6tsT7f/DO0Pdlaso9g7PVy8R+B3VkWAh76uCcICIPFBluC/ljaH V8hI+VsCLpMClo83YMCEM6E6nAPD22+fDR/DF9P73P04yUvJVHx4cnHPrpxVrPbaJoKrr9mUOLFy VRekX78ZRgiFiKYDNsiq9+148oRy+VehpmBoQ+T2EPeDFQ8JJ4xT8H7qdyr1swSk/9Lu4K0kw/yC TSb9K/wCuiHiuoSB54rzJoQxz90gS868r/+JGahYwHY5dUh1RbA4g5N8H3TDThc=</X509Certificate>
                </X509Data>
            </KeyInfo>
        </Signature>
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:X509Data>
                        <ds:X509Certificate>MIIEKzCCAxOgAwIBAgIDE2Y0MA0GCSqGSIb3DQEBCwUAMGAxCzAJBgNVBAYTAklUMRgwFgYDVQQKDA9Qb3N0ZWNvbSBTLnAuQS4xIDAeBgNVBAsMF0NlcnRpZmljYXRpb24gQXV0aG9yaXR5MRUwEwYDVQQDDAxQb3N0ZWNvbSBDQTMwHhcNMTYwMjI2MTU1MjQ0WhcNMjEwMjI2MTU1MjQ0WjBxMQswCQYDVQQGEwJJVDEOMAwGA1UECAwFSXRhbHkxDTALBgNVBAcMBFJvbWUxHjAcBgNVBAoMFVBvc3RlIEl0YWxpYW5lIFMucC5BLjENMAsGA1UECwwEU1BJRDEUMBIGA1UEAwwLSURQLVBvc3RlSUQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZFEtJoEHFAjpCaZcj5DVWrRDyaLZyu31XApslbo87CyWz61OJMtw6QQU0MdCtrYbtSJ6vJwx7/6EUjsZ3u4x3EPLdlkyiGOqukPwATv4c7TVOUVs5onIqTphM9b+AHRg4ehiMGesm/9d7RIaLuN79iPUvdLn6WP3idAfEw+rhJ/wYEQ0h1Xm5osNUgtWcBGavZIjLssWNrDDfJYxXH3QZ0kI6feEvLCJwgjXLGkBuhFehNhM4fhbX9iUCWwwkJ3JsP2++Rc/iTA0LZhiUsXNNq7gBcLAJ9UX2V1dWjTzBHevfHspzt4e0VgIIwbDRqsRtF8VUPSDYYbLoqwbLt18XAgMBAAGjgdwwgdkwRgYDVR0gBD8wPTAwBgcrTAsBAgEBMCUwIwYIKwYBBQUHAgEWF2h0dHA6Ly93d3cucG9zdGVjZXJ0Lml0MAkGBytMCwEBCgIwDgYDVR0PAQH/BAQDAgSwMB8GA1UdIwQYMBaAFKc0XP2FByYU2l0gFzGKE8zVSzfmMD8GA1UdHwQ4MDYwNKAyoDCGLmh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvcG9zdGVjb21jYTMvY3JsMy5jcmwwHQYDVR0OBBYEFEvrikZQkfBjuiTpxExSBe8wGgsyMA0GCSqGSIb3DQEBCwUAA4IBAQBNAw8UoeiCF+1rFs27d3bEef6CLe/PJga9EfwKItjMDD9QzT/FShRWKLHlK69MHL1ZLPRPvuWUTkIOHTpNqBPILvO1u13bSg+6o+2OdqAkCBkbTqbGjWSPLaTUVNV6MbXmvttD8Vd9vIZg1xBBG3Fai13dwvSj3hAZd8ug8a8fW1y/iDbRC5D1O+HlHDuvIW4LbJ093jdj+oZwSyd216gtXL00QA0C1uMuDv9Wf9IxniTb710dRSgIcM4/eR7832fZgdOsoalFzGYWxSCs8WOZrjpub1fdaRSEuCQk2+gmdsiRcTs9EqPCCNiNlrNAiWEyGtL8A4ao3pDMwCtrb2yr</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:X509Data>
                        <ds:X509Certificate>MIIFgzCCA2ugAwIBAgIIJSppAZKg/XQwDQYJKoZIhvcNAQELBQAwZTELMAkGA1UEBhMCSVQxHjAc BgNVBAoMFVBvc3RlIEl0YWxpYW5lIFMucC5BLjEaMBgGA1UEYQwRVkFUSVQtMDExMTQ2MDEwMDYx GjAYBgNVBAMMEVBvc3RlIEl0YWxpYW5lIENBMB4XDTIxMDIxODExNDYzMVoXDTI0MDIxOTExNDYz MVowQzELMAkGA1UEBhMCSVQxHjAcBgNVBAoMFVBvc3RlIEl0YWxpYW5lIFMucC5BLjEUMBIGA1UE AwwLaWRwLXBvc3RlaWQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZFEtJoEHFAjpC aZcj5DVWrRDyaLZyu31XApslbo87CyWz61OJMtw6QQU0MdCtrYbtSJ6vJwx7/6EUjsZ3u4x3EPLd lkyiGOqukPwATv4c7TVOUVs5onIqTphM9b+AHRg4ehiMGesm/9d7RIaLuN79iPUvdLn6WP3idAfE w+rhJ/wYEQ0h1Xm5osNUgtWcBGavZIjLssWNrDDfJYxXH3QZ0kI6feEvLCJwgjXLGkBuhFehNhM4 fhbX9iUCWwwkJ3JsP2++Rc/iTA0LZhiUsXNNq7gBcLAJ9UX2V1dWjTzBHevfHspzt4e0VgIIwbDR qsRtF8VUPSDYYbLoqwbLt18XAgMBAAGjggFXMIIBUzA/BggrBgEFBQcBAQQzMDEwLwYIKwYBBQUH MAGGI2h0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvcGktb2NzcENBMB0GA1UdDgQWBBRL64pGUJHw Y7ok6cRMUgXvMBoLMjAfBgNVHSMEGDAWgBRs0025F7hHd0d+ULyAaELPZ7w/eTA+BgNVHSAENzA1 MDMGCCtMMAEFAQEEMCcwJQYIKwYBBQUHAgEWGWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQwOAYD VR0fBDEwLzAtoCugKYYnaHR0cDovL3Bvc3RlY2VydC5wb3N0ZS5pdC9waS1DQS9jcmwuY3JsMA4G A1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwJwYDVR0RBCAwHoEc aWRwLXBvc3RlaWRAcG9zdGVpdGFsaWFuZS5pdDANBgkqhkiG9w0BAQsFAAOCAgEAp0EhITlTx+cO aoXw//nBl6Q4y82MfSGfPJIw3ROV1z3tHBctaksi/RxAzyMD5beO2s8Q6lXx0sLMCcuUQmzHj3eJ bqn+6sIUr000dSlX/iPgVUc2dvPIZZg9xu38J8NvCfrtgAGY5iMVFMd3CZLFw0ybr+Bx/1K/NhQO 7jxn0RSGA1J4mM2syVhEDUODs9kz3T4kXYUofwwvPL1a9xB9RBqbp7plYtbBBdftEORUQrWzH1mz NO4nlFkX9qgVrgFIIJJT2KadHoop1r65O9ffncK14qpNo3eTsNDq3hRlteb7ylmlJ8CoakUWZeXD DP9ZboWxZkyp+9903OrToRvOgeWSc+YrqcRZOv7r6tTALTk4U9OTKDG9/eNWSGQqD7Qd/9rssfF0 uJEGHnbsk/Hvdxn8apgWN1Zwt6tsT7f/DO0Pdlaso9g7PVy8R+B3VkWAh76uCcICIPFBluC/ljaH V8hI+VsCLpMClo83YMCEM6E6nAPD22+fDR/DF9P73P04yUvJVHx4cnHPrpxVrPbaJoKrr9mUOLFy VRekX78ZRgiFiKYDNsiq9+148oRy+VehpmBoQ+T2EPeDFQ8JJ4xT8H7qdyr1swSk/9Lu4K0kw/yC TSb9K/wCuiHiuoSB54rzJoQxz90gS868r/+JGahYwHY5dUh1RbA4g5N8H3TDThc=</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://posteid.poste.it/jod-fs/sloservicepost" ResponseLocation="https://posteid.poste.it/jod-fs/sloserviceresponsepost"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://posteid.poste.it/jod-fs/sloserviceredirect" ResponseLocation="https://posteid.poste.it/jod-fs/sloserviceresponseredirect"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://posteid.poste.it/jod-fs/ssoservicepost"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://posteid.poste.it/jod-fs/ssoserviceredirect"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="familyName" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="name" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="spidCode" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="fiscalNumber" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="gender" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="dateOfBirth" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="placeOfBirth" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="countyOfBirth" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="idCard" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="address" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="domicileStreetAddress" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="domicilePostalCode" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="domicileMunicipality" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="domicileProvince" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="domicileNation" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="digitalAddress" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="expirationDate" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="email" NameFormat="xsi:string"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="mobilePhone" NameFormat="xsi:string"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="it">Poste Italiane SpA</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="it">Poste Italiane SpA</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="it">https://www.poste.it</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- POSTE ID *end* -->
    <!-- SIELTE ID *start* -->
    <md:EntityDescriptor ID="pfxf9223e2d-feaf-64df-5f85-0836c6ae13bb" entityID="https://identity.sieltecloud.it">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>MIIDczCCAlugAwIBAgIJAMsX0iEKQM6xMA0GCSqGSIb3DQEBCwUAMFAxCzAJBgNVBAYTAklUMQ4wDAYDVQQIDAVJdGFseTEgMB4GA1UEBwwXU2FuIEdyZWdvcmlvIGRpIENhdGFuaWExDzANBgNVBAoMBlNpZWx0ZTAeFw0xNTEyMTQwODE0MTVaFw0yNTEyMTMwODE0MTVaMFAxCzAJBgNVBAYTAklUMQ4wDAYDVQQIDAVJdGFseTEgMB4GA1UEBwwXU2FuIEdyZWdvcmlvIGRpIENhdGFuaWExDzANBgNVBAoMBlNpZWx0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANIRlOjM/tS9V9jYjJreqZSctuYriLfPTDgX2XdhWEbMpMpwA9p0bsbLQoC1gP0piLO+qbCsIh9+boPfb4/dLIA7E+Vmm5/+evOtzvjfHG4oXjZK6jo08QwkVV8Bm1jkakJPVZ57QFbyDSr+uBbIMY7CjA2LdgnIIwKN/kSfFhrZUMJ6ZxwegM100X5psfNPSV9WUtgHsvqlIlvydPo2rMm21sg+2d3Vtg8DthNSYRLqgazCc0NTsigrH7niSbJCO0nq/svMX2rSFdh5GFK7/pxT+c3OFWqIR8r+RX4qW+auJqkbTuNRwxV22Sm6r69ZJwV0WspvsVJi+FYqiyoWhgUCAwEAAaNQME4wHQYDVR0OBBYEFCUx063GwUhEFDllwCBe/+jdeW+XMB8GA1UdIwQYMBaAFCUx063GwUhEFDllwCBe/+jdeW+XMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADF94c3JwyBM86QBLeoUZxRYKPniba8B39FfJk0pb+LejKfZMvspOrOFgYQQ9UrS8IFkBX9Xr7/tjRbr2cPwZNjrEZhoq+NfcE09bnaWTyEl1IEKK8TWOupJj9UNVpYXX0LfIRrMwNEzAPQykOaqPOnyHxOCPTY957xXSo3jXOyvugtvPHbd+iliAzUoPm1tgiTKWS+EkQ/e22eFv5NEyT+oHiKovrQ+voPWOIvJVMjiTyxRic8fEnI9zzV0SxWvFvty77wgcYbeEuFZa3iidhojUge8o1uY/JUyQjFxcvvfAgWSIZwdHiNyWaAgwzLPmPCPsvBdR3xrlcDg/9Bd3D0=</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:KeyDescriptor use="encryption">
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>MIIDczCCAlugAwIBAgIJAMsX0iEKQM6xMA0GCSqGSIb3DQEBCwUAMFAxCzAJBgNVBAYTAklUMQ4wDAYDVQQIDAVJdGFseTEgMB4GA1UEBwwXU2FuIEdyZWdvcmlvIGRpIENhdGFuaWExDzANBgNVBAoMBlNpZWx0ZTAeFw0xNTEyMTQwODE0MTVaFw0yNTEyMTMwODE0MTVaMFAxCzAJBgNVBAYTAklUMQ4wDAYDVQQIDAVJdGFseTEgMB4GA1UEBwwXU2FuIEdyZWdvcmlvIGRpIENhdGFuaWExDzANBgNVBAoMBlNpZWx0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANIRlOjM/tS9V9jYjJreqZSctuYriLfPTDgX2XdhWEbMpMpwA9p0bsbLQoC1gP0piLO+qbCsIh9+boPfb4/dLIA7E+Vmm5/+evOtzvjfHG4oXjZK6jo08QwkVV8Bm1jkakJPVZ57QFbyDSr+uBbIMY7CjA2LdgnIIwKN/kSfFhrZUMJ6ZxwegM100X5psfNPSV9WUtgHsvqlIlvydPo2rMm21sg+2d3Vtg8DthNSYRLqgazCc0NTsigrH7niSbJCO0nq/svMX2rSFdh5GFK7/pxT+c3OFWqIR8r+RX4qW+auJqkbTuNRwxV22Sm6r69ZJwV0WspvsVJi+FYqiyoWhgUCAwEAAaNQME4wHQYDVR0OBBYEFCUx063GwUhEFDllwCBe/+jdeW+XMB8GA1UdIwQYMBaAFCUx063GwUhEFDllwCBe/+jdeW+XMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADF94c3JwyBM86QBLeoUZxRYKPniba8B39FfJk0pb+LejKfZMvspOrOFgYQQ9UrS8IFkBX9Xr7/tjRbr2cPwZNjrEZhoq+NfcE09bnaWTyEl1IEKK8TWOupJj9UNVpYXX0LfIRrMwNEzAPQykOaqPOnyHxOCPTY957xXSo3jXOyvugtvPHbd+iliAzUoPm1tgiTKWS+EkQ/e22eFv5NEyT+oHiKovrQ+voPWOIvJVMjiTyxRic8fEnI9zzV0SxWvFvty77wgcYbeEuFZa3iidhojUge8o1uY/JUyQjFxcvvfAgWSIZwdHiNyWaAgwzLPmPCPsvBdR3xrlcDg/9Bd3D0=</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://identity.sieltecloud.it/simplesaml/saml2/idp/SLS.php"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://identity.sieltecloud.it/simplesaml/saml2/idp/SLS.php"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://identity.sieltecloud.it/simplesaml/saml2/idp/SSO.php"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://identity.sieltecloud.it/simplesaml/saml2/idp/SSO.php"/>
            <saml:Attribute Name="familyName"/>
            <saml:Attribute Name="name"/>
            <saml:Attribute Name="spidCode"/>
            <saml:Attribute Name="fiscalNumber"/>
            <saml:Attribute Name="gender"/>
            <saml:Attribute Name="dateOfBirth"/>
            <saml:Attribute Name="placeOfBirth"/>
            <saml:Attribute Name="companyName"/>
            <saml:Attribute Name="registeredOffice"/>
            <saml:Attribute Name="ivaCode"/>
            <saml:Attribute Name="idCard"/>
            <saml:Attribute Name="mobilePhone"/>
            <saml:Attribute Name="email"/>
            <saml:Attribute Name="address"/>
            <saml:Attribute Name="digitalAddress"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="en">Sielte S.p.A.</md:OrganizationName>
            <md:OrganizationName xml:lang="it">Sielte S.p.A.</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="en">http://www.sielte.it</md:OrganizationDisplayName>
            <md:OrganizationDisplayName xml:lang="it">http://www.sielte.it</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="en">http://www.sielte.it</md:OrganizationURL>
            <md:OrganizationURL xml:lang="it">http://www.sielte.it</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- SIELTE ID *end* -->
    <!-- SPIDITALIA *start* -->
    <md:EntityDescriptor ID="_ff3cffde0ce6f778bc26f1ebcc782548" entityID="https://spid.register.it">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>MIIDazCCAlOgAwIBAgIED8R+MDANBgkqhkiG9w0BAQsFADBmMQswCQYDVQQGEwJJVDELMAkGA1UECBMCRkkxETAPBgNVBAcTCGZsb3JlbmNlMREwDwYDVQQKEwhyZWdpc3RlcjERMA8GA1UECxMIcmVnaXN0ZXIxETAPBgNVBAMTCHJlZ2lzdGVyMB4XDTE3MDcxMDEwMzM0OVoXDTI3MDcwODEwMzM0OVowZjELMAkGA1UEBhMCSVQxCzAJBgNVBAgTAkZJMREwDwYDVQQHEwhmbG9yZW5jZTERMA8GA1UEChMIcmVnaXN0ZXIxETAPBgNVBAsTCHJlZ2lzdGVyMREwDwYDVQQDEwhyZWdpc3RlcjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANkYXHbm3q6xt3wrLAXnytswtj2JE1MM8aYmNXkTgDMCwO/+ahQOoQru6IBTbjfWH9jr+Woy54FDdX6bHl+5/mO6l/yAB/bKgwe5HmUjZJ5oakJjWucsSm+VkEwN2HquBZoN+mktju00xvLX5VAjmDHvZc/b8NhNr/FRKlYITboygkhGiUwGI3wLf3IaB76J0o7ugpW2WNLcywpX+p1VWZAMCdHBveBe/e42hh6WnWPqdwYUWHOgJ8HX4IzCHifiS1n6eUMgtoTQOmSvTQDwSjD0WWJE8tWSYt+txXg1t+3A3tbZOFu7T442wE7DtMdUL4+8gimQS+e8PxDK1uTqIPUCAwEAAaMhMB8wHQYDVR0OBBYEFMCgo1gzCIcUThQIs5g5ikfv1D7eMA0GCSqGSIb3DQEBCwUAA4IBAQBnGw3i3hQ37L8vyelkyZMeO3tLK65Cqti4oVrQZxClGV5zNA6fIMDY8Mci1UhLwjzp29POd/sez0vuHZ/Vmmygzoye4jTKr6c3jAh0u81FTzefBU+vIietm9RuV3sd7D9xq6EqOY1NDL+rkvBcTFtiwLEUm2kHYu/U67jk73pxOtmqxQvQeMU8oi42tehMZGLIGp3U5lGS8YGGl+GtkkQ2Z5/PSm67HGP81kTArG/QX+bX+ykypTJVg9hfb9zOFQidp1HkCRIez6YhDiP/ZLurd6Grt/wVfZPNBO8EOgy25AkRZlp+UD686BFg7qq5KKEbz3qmPrj8deHL3duacZcp</ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://spid.register.it/login/singleLogout" ResponseLocation="https://spid.register.it/login/singleLogout/response"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://spid.register.it/login/singleLogout" ResponseLocation="https://spid.register.it/login/singleLogout/response"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://spid.register.it/login/sso"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://spid.register.it/login/sso"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="email"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="mobilePhone"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="idCard"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="fiscalNumber"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="gender"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="dateOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="familyName"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="name"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="spidCode"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="placeOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="address"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="digitalAddress"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="expirationDate"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="countyOfBirth"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="ivaCode"/>
            <saml2:Attribute xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Name="companyName"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="it">Register.it S.p.A.</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="it">Register.it                S.p.A.</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="it">https//www.register.it</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- SPIDITALIA *end* -->
    <!-- TEAM SYSTEM ID *start* -->
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="id-8c0a719d-5f86-4333-ac66-461c2c399f4c" entityID="https://spid.teamsystem.com/idp">
  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <ds:SignedInfo>
      <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
      <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
      <ds:Reference URI="#id-8c0a719d-5f86-4333-ac66-461c2c399f4c">
        <ds:Transforms>
          <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
          <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
        </ds:Transforms>
        <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
        <ds:DigestValue>rw0Zute0/NS7Iw+A20gWwY5wnqSyDi2Ai8OCw1M/niQ=</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
    <ds:SignatureValue>VG8/YkTx2L9avP9z0xrKhvShftz+vlzaRlJSjXpi/cIryqlIWEP9unnai2kvveN1FFqeGWx5BHpKo4Ur+Pa8yqHZGUu4OQp53VXzBDmMJD4L3BdnQ4PlrpNkyveBf54iLJBgGvuFJuuxA9r5u9ZXUfTe+lbZF1Jvxlgq49EBl4B9I8wV7Vf7Ggr9aanV1y714Kk8sDrMGksk1lJjw62mDCAAqTQr4LtMqxFdmMxEz3Rm1qkM9EDTrgGxp8jmIzpsx3YS4xNLBvTKj7ZACfPvMzGTDerFdYP/HJwUg379Ekz4CsRjE98QR9y1SbygEFZxybzhMOSRnaO2WGJotXq4xw==</ds:SignatureValue>
    <ds:KeyInfo>
      <ds:X509Data>
        <ds:X509Certificate>MIIINTCCBh2gAwIBAgIIJz+ujRbSAYwwDQYJKoZIhvcNAQENBQAwgfsxCzAJBgNV
BAYTAklUMQ0wCwYDVQQHDARSb21lMSYwJAYDVQQKDB1BZ2VuemlhIHBlciBsJ0l0
YWxpYSBEaWdpdGFsZTEwMC4GA1UECwwnU2Vydml6aW8gQWNjcmVkaXRhbWVudG8g
ZSBwcm9nZXR0byBTUElEMTwwOgYDVQQDDDNQcm9nZXR0byBTUElEIC0gR2VzdG9y
aSBkaSBJZGVudGl0w6AgRGlnaXRhbGUgKElkUCkxKTAnBgkqhkiG9w0BCQEWGnBy
b3RvY29sbG9AcGVjLmFnaWQuZ292Lml0MRowGAYDVQQFExFWQVRJVC05NzczNTAy
MDU4NDAeFw0yMjA1MTAwMDAwMDBaFw0zMjA1MDkyMzU5NTlaMIGrMRowGAYDVQRh
DBFWQVRJVC0wMTAzNTMxMDQxNDEcMBoGA1UEAwwTc3BpZC50ZWFtc3lzdGVtLmNv
bTEaMBgGA1UECgwRVGVhbVN5c3RlbSBTLnAuQS4xKDAmBgNVBFMMH2h0dHBzOi8v
c3BpZC50ZWFtc3lzdGVtLmNvbS9pZHAxCzAJBgNVBAYTAklUMQ8wDQYDVQQHDAZQ
ZXNhcm8xCzAJBgNVBAgMAlBVMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAyNJMgyn+iquzTvLR5Z/eYBfOoyJIfI3rYcj5WOSlTzlqXXBCzdcROm/JKgrf
3MOTEzH8RAn6XkSHXtJDtMpD7GlwYB0mo8scqDNtpszbhm/UXapJTrP7gy/UI3yf
n99n4hvqkGOdld7w5vaAPS0w9PdcaRxY/7X4olHKBAx2cHAwiqhKuiFEDhfACRWs
bw4gaIjVM7NuUtL/jG+PJV1NHrEn10vizE7IneMxDNqiQ14IjLL7pJMEPXwbXedz
ZsModKKAXIX5reNSegEU1Y386BCkmg4IMWd+DglmMJ4uuzcga1AppgjDuqb8yFDa
NOKy/0Jivh2rs7u9boE4cLVBPQIDAQABo4IDCTCCAwUwCQYDVR0TBAIwADAdBgNV
HQ4EFgQU/q5NWlPmylmZTsX0C2MwZkrx3b4wHwYDVR0jBBgwFoAUyF8jl8Jbn9To
hwSTF77f5QNJd18wDgYDVR0PAQH/BAQDAgbAMBEGA1UdEQQKMAiCBmlkcC5pdDAW
BgNVHRIEDzANggtzcGlkLmdvdi5pdDA/BgNVHR8EODA2MDSgMqAwhi5odHRwczov
L2VpZGFzLmFnaWQuZ292Lml0L2NybC9jcmxfU1BJRF9JZFAuY3JsMGoGCCsGAQUF
BwEBBF4wXDBEBggrBgEFBQcwAoY4aHR0cDovL2VpZGFzLmFnaWQuZ292Lml0L2Nl
cnRpZmljYXRpL1N1Yl9DQV9TUElEX0lkUC5jZXIwFAYIKwYBBQUHMAGGCGh0dHBz
Oi8vMIIBzgYDVR0gBIIBxTCCAcEwCQYHBACORgEGAjCBlQYEK0wQBjCBjDBEBggr
BgEFBQcCAjA4GjZFbGVjdHJvbmljIGNlcnRpZmljYXRlIGNvbmZvcm1pbmcgd2l0
aCBBR0lEIEd1aWRlbGluZXMwRAYIKwYBBQUHAgIwOBo2Q2VydGlmaWNhdG8gZWxl
dHRyb25pY28gY29uZm9ybWUgYWxsZSBMaW5lZSBndWlkYSBBZ0lEMHIGBitMEAQB
AjBoMDkGCCsGAQUFBwICMC0aK1NQSUQ6IGdlc3RvcmUgZGVsbGUgaWRlbnRpdOAg
ZGlnaXRhbGkgKElkUCkwKwYIKwYBBQUHAgIwHxodU1BJRDogSWRlbnRpdHkgUHJv
dmlkZXIgKElkUCkwCAYGBACPegEDME0GBCtMEAQwRTBDBggrBgEFBQcCARY3aHR0
cHM6Ly9laWRhcy5hZ2lkLmdvdi5pdC9jcHMvQWdJRF9lSURBU19yb290Q0FfY3Bz
LnBkZjBPBgYEAI5GAQUwRTBDBggrBgEFBQcCARY3aHR0cHM6Ly9laWRhcy5hZ2lk
Lmdvdi5pdC9jcHMvQWdJRF9lSURBU19yb290Q0FfY3BzLnBkZjANBgkqhkiG9w0B
AQ0FAAOCAgEAG9XZeAkIuqSmYb6bq5WrcI2FQtVrfbMH1CXGDKytZUsH5phkGfk/
8UaIfkbHhnWakM4H9J2gnvfhKorfMt2FHyXFFJ38hlWR8MhFziqthXLUxyLZpUMn
h8CcNQyFpNz7xbZk/qN5yFfJyY4Rggm1qdgCNR1LsVI3hjuaORTAzvy4kLjfuU5r
nVYPcxpHF7feJKlN03d8JRKYaIi5U+QVYtYJpTcE7jeYmn4Ewfry2BDCOsnljeYl
gm3fF8EEVpMfHIhvJg8evATWmKWHpXL2BRtVrl7TfhvtWqKv4tLff+Lv2YqRpmYu
oApA48/MB4QxwAPUBnmQb3CxVGs6OCbE/tdUfda9HuHP5MXYLtTVbRYu8pHEPnaN
jPA8y90KRw2wiedgjgOG8BxOkhVF/cYs3yH+0hbPS5Oji27t0P2g9eG/p9TOy4AI
gUykFimVFk6HV9znknrFSdgsePSp+T5zy45Jdi1z4/RgJN10szJfqEBuvd8MhUu4
meVgfDqXrqavCVzGpSLuicdk41sTOviBz+PEgbQ/qP9KHQv67SHoF4US9Pp9tkyj
VFUs7lBnrlFAPpOzd97XdiZfotCA5umibqlxLshy4UK7yl2LZFllpxrfiXTCDASM
KlMMIcIsWx0lU/qw5KPpqvXELiya791kohJTi+9pyG7LXIOHHA0whr0=</ds:X509Certificate>
      </ds:X509Data>
    </ds:KeyInfo>
  </ds:Signature>
  <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:KeyDescriptor use="signing">
      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:X509Data>
          <ds:X509Certificate>MIIINTCCBh2gAwIBAgIIJz+ujRbSAYwwDQYJKoZIhvcNAQENBQAwgfsxCzAJBgNV
BAYTAklUMQ0wCwYDVQQHDARSb21lMSYwJAYDVQQKDB1BZ2VuemlhIHBlciBsJ0l0
YWxpYSBEaWdpdGFsZTEwMC4GA1UECwwnU2Vydml6aW8gQWNjcmVkaXRhbWVudG8g
ZSBwcm9nZXR0byBTUElEMTwwOgYDVQQDDDNQcm9nZXR0byBTUElEIC0gR2VzdG9y
aSBkaSBJZGVudGl0w6AgRGlnaXRhbGUgKElkUCkxKTAnBgkqhkiG9w0BCQEWGnBy
b3RvY29sbG9AcGVjLmFnaWQuZ292Lml0MRowGAYDVQQFExFWQVRJVC05NzczNTAy
MDU4NDAeFw0yMjA1MTAwMDAwMDBaFw0zMjA1MDkyMzU5NTlaMIGrMRowGAYDVQRh
DBFWQVRJVC0wMTAzNTMxMDQxNDEcMBoGA1UEAwwTc3BpZC50ZWFtc3lzdGVtLmNv
bTEaMBgGA1UECgwRVGVhbVN5c3RlbSBTLnAuQS4xKDAmBgNVBFMMH2h0dHBzOi8v
c3BpZC50ZWFtc3lzdGVtLmNvbS9pZHAxCzAJBgNVBAYTAklUMQ8wDQYDVQQHDAZQ
ZXNhcm8xCzAJBgNVBAgMAlBVMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAyNJMgyn+iquzTvLR5Z/eYBfOoyJIfI3rYcj5WOSlTzlqXXBCzdcROm/JKgrf
3MOTEzH8RAn6XkSHXtJDtMpD7GlwYB0mo8scqDNtpszbhm/UXapJTrP7gy/UI3yf
n99n4hvqkGOdld7w5vaAPS0w9PdcaRxY/7X4olHKBAx2cHAwiqhKuiFEDhfACRWs
bw4gaIjVM7NuUtL/jG+PJV1NHrEn10vizE7IneMxDNqiQ14IjLL7pJMEPXwbXedz
ZsModKKAXIX5reNSegEU1Y386BCkmg4IMWd+DglmMJ4uuzcga1AppgjDuqb8yFDa
NOKy/0Jivh2rs7u9boE4cLVBPQIDAQABo4IDCTCCAwUwCQYDVR0TBAIwADAdBgNV
HQ4EFgQU/q5NWlPmylmZTsX0C2MwZkrx3b4wHwYDVR0jBBgwFoAUyF8jl8Jbn9To
hwSTF77f5QNJd18wDgYDVR0PAQH/BAQDAgbAMBEGA1UdEQQKMAiCBmlkcC5pdDAW
BgNVHRIEDzANggtzcGlkLmdvdi5pdDA/BgNVHR8EODA2MDSgMqAwhi5odHRwczov
L2VpZGFzLmFnaWQuZ292Lml0L2NybC9jcmxfU1BJRF9JZFAuY3JsMGoGCCsGAQUF
BwEBBF4wXDBEBggrBgEFBQcwAoY4aHR0cDovL2VpZGFzLmFnaWQuZ292Lml0L2Nl
cnRpZmljYXRpL1N1Yl9DQV9TUElEX0lkUC5jZXIwFAYIKwYBBQUHMAGGCGh0dHBz
Oi8vMIIBzgYDVR0gBIIBxTCCAcEwCQYHBACORgEGAjCBlQYEK0wQBjCBjDBEBggr
BgEFBQcCAjA4GjZFbGVjdHJvbmljIGNlcnRpZmljYXRlIGNvbmZvcm1pbmcgd2l0
aCBBR0lEIEd1aWRlbGluZXMwRAYIKwYBBQUHAgIwOBo2Q2VydGlmaWNhdG8gZWxl
dHRyb25pY28gY29uZm9ybWUgYWxsZSBMaW5lZSBndWlkYSBBZ0lEMHIGBitMEAQB
AjBoMDkGCCsGAQUFBwICMC0aK1NQSUQ6IGdlc3RvcmUgZGVsbGUgaWRlbnRpdOAg
ZGlnaXRhbGkgKElkUCkwKwYIKwYBBQUHAgIwHxodU1BJRDogSWRlbnRpdHkgUHJv
dmlkZXIgKElkUCkwCAYGBACPegEDME0GBCtMEAQwRTBDBggrBgEFBQcCARY3aHR0
cHM6Ly9laWRhcy5hZ2lkLmdvdi5pdC9jcHMvQWdJRF9lSURBU19yb290Q0FfY3Bz
LnBkZjBPBgYEAI5GAQUwRTBDBggrBgEFBQcCARY3aHR0cHM6Ly9laWRhcy5hZ2lk
Lmdvdi5pdC9jcHMvQWdJRF9lSURBU19yb290Q0FfY3BzLnBkZjANBgkqhkiG9w0B
AQ0FAAOCAgEAG9XZeAkIuqSmYb6bq5WrcI2FQtVrfbMH1CXGDKytZUsH5phkGfk/
8UaIfkbHhnWakM4H9J2gnvfhKorfMt2FHyXFFJ38hlWR8MhFziqthXLUxyLZpUMn
h8CcNQyFpNz7xbZk/qN5yFfJyY4Rggm1qdgCNR1LsVI3hjuaORTAzvy4kLjfuU5r
nVYPcxpHF7feJKlN03d8JRKYaIi5U+QVYtYJpTcE7jeYmn4Ewfry2BDCOsnljeYl
gm3fF8EEVpMfHIhvJg8evATWmKWHpXL2BRtVrl7TfhvtWqKv4tLff+Lv2YqRpmYu
oApA48/MB4QxwAPUBnmQb3CxVGs6OCbE/tdUfda9HuHP5MXYLtTVbRYu8pHEPnaN
jPA8y90KRw2wiedgjgOG8BxOkhVF/cYs3yH+0hbPS5Oji27t0P2g9eG/p9TOy4AI
gUykFimVFk6HV9znknrFSdgsePSp+T5zy45Jdi1z4/RgJN10szJfqEBuvd8MhUu4
meVgfDqXrqavCVzGpSLuicdk41sTOviBz+PEgbQ/qP9KHQv67SHoF4US9Pp9tkyj
VFUs7lBnrlFAPpOzd97XdiZfotCA5umibqlxLshy4UK7yl2LZFllpxrfiXTCDASM
KlMMIcIsWx0lU/qw5KPpqvXELiya791kohJTi+9pyG7LXIOHHA0whr0=</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </md:KeyDescriptor>
    <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://spid.teamsystem.com/idp/logout/post"/>
    <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://spid.teamsystem.com/idp/logout/redirect"/>
    <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
    <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://spid.teamsystem.com/idp/sso/post"/>
    <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://spid.teamsystem.com/idp/sso/redirect"/>
    <saml2:Attribute xsi:type="xsi:string" Name="address"/>
    <saml2:Attribute xsi:type="xsi:string" Name="companyName"/>
    <saml2:Attribute xsi:type="xsi:string" Name="countyOfBirth"/>
    <saml2:Attribute xsi:type="xsi:date" Name="dateOfBirth"/>
    <saml2:Attribute xsi:type="xsi:string" Name="digitalAddress"/>
    <saml2:Attribute xsi:type="xsi:string" Name="email"/>
    <saml2:Attribute xsi:type="xsi:date" Name="expirationDate"/>
    <saml2:Attribute xsi:type="xsi:string" Name="familyName"/>
    <saml2:Attribute xsi:type="xsi:string" Name="fiscalNumber"/>
    <saml2:Attribute xsi:type="xsi:string" Name="gender"/>
    <saml2:Attribute xsi:type="xsi:string" Name="idCard"/>
    <saml2:Attribute xsi:type="xsi:string" Name="ivaCode"/>
    <saml2:Attribute xsi:type="xsi:string" Name="mobilePhone"/>
    <saml2:Attribute xsi:type="xsi:string" Name="name"/>
    <saml2:Attribute xsi:type="xsi:string" Name="placeOfBirth"/>
    <saml2:Attribute xsi:type="xsi:string" Name="registeredOffice"/>
    <saml2:Attribute xsi:type="xsi:string" Name="spidCode"/>
    <saml2:Attribute xsi:type="xsi:string" Name="companyFiscalNumber"/>
    <saml2:Attribute xsi:type="xsi:string" Name="domicileStreetAddress"/>
    <saml2:Attribute xsi:type="xsi:string" Name="domicileMunicipality"/>
    <saml2:Attribute xsi:type="xsi:string" Name="domicilePostalCode"/>
    <saml2:Attribute xsi:type="xsi:string" Name="domicileProvince"/>
    <saml2:Attribute xsi:type="xsi:string" Name="domicileNation"/>
  </md:IDPSSODescriptor>
  <saml2p:Extensions xmlns:spid="https://spid.gov.it/saml-extensions">
    <spid:SupportedAuthnContextClassRefs>
      <AuthnContextClassRef>https://www.spid.gov.it/SpidL1</AuthnContextClassRef>
      <AuthnContextClassRef>https://www.spid.gov.it/SpidL2</AuthnContextClassRef>
    </spid:SupportedAuthnContextClassRefs>
    <spid:SupportedPurposes>
      <Purpose>P</Purpose>
      <Purpose>LP</Purpose>
      <Purpose>PG</Purpose>
      <Purpose>PF</Purpose>
      <Purpose>PX</Purpose>
    </spid:SupportedPurposes>
  </saml2p:Extensions>
  <md:Organization>
    <md:OrganizationName xml:lang="it">TeamSystem s.p.a.</md:OrganizationName>
    <md:OrganizationName xml:lang="en">TeamSystem s.p.a.</md:OrganizationName>
    <md:OrganizationDisplayName xml:lang="it">TeamSystem</md:OrganizationDisplayName>
    <md:OrganizationDisplayName xml:lang="en">TeamSystem</md:OrganizationDisplayName>
    <md:OrganizationURL xml:lang="it">https://www.teamsystem.com</md:OrganizationURL>
    <md:OrganizationURL xml:lang="en">https://international.teamsystem.com/ww/</md:OrganizationURL>
  </md:Organization>
</md:EntityDescriptor>
    <!-- TEAM SYSTEM ID *end* -->
    <!-- TIM ID *start* -->
    <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" ID="_d2301c246999a2b66348086deeaa3befc1bde2222" entityID="https://login.id.tim.it/affwebservices/public/saml2sso">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:X509Data>
                        <ds:X509IssuerSerial>
                            <ds:X509IssuerName>CN=TI Trust Technologies srl,OU=Servizi per l'identita digitale,O=Telecom Italia Trust Technologies srl,L=Pomezia,ST=RM,C=IT</ds:X509IssuerName>
                            <ds:X509SerialNumber>16181073618410851771</ds:X509SerialNumber>
                        </ds:X509IssuerSerial>
                        <ds:X509Certificate>MIIEKTCCAxGgAwIBAgIJAOCOuLmV0s27MA0GCSqGSIb3DQEBCwUAMIGqMSIwIAYDVQQDDBlUSSBUcnVzdCBUZWNobm9sb2dpZXMgc3JsMSgwJgYDVQQLDB9TZXJ2aXppIHBlciBsJ2lkZW50aXRhIGRpZ2l0YWxlMS4wLAYDVQQKDCVUZWxlY29tIEl0YWxpYSBUcnVzdCBUZWNobm9sb2dpZXMgc3JsMRAwDgYDVQQHDAdQb21lemlhMQswCQYDVQQIDAJSTTELMAkGA1UEBhMCSVQwHhcNMTcxMTE3MTUzNzIyWhcNMjExMTE2MTUzNzIyWjCBqjEiMCAGA1UEAwwZVEkgVHJ1c3QgVGVjaG5vbG9naWVzIHNybDEoMCYGA1UECwwfU2Vydml6aSBwZXIgbCdpZGVudGl0YSBkaWdpdGFsZTEuMCwGA1UECgwlVGVsZWNvbSBJdGFsaWEgVHJ1c3QgVGVjaG5vbG9naWVzIHNybDEQMA4GA1UEBwwHUG9tZXppYTELMAkGA1UECAwCUk0xCzAJBgNVBAYTAklUMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwEBMMNhDczJh9ewCYX/Ag135q4c0n4Qg6FGfX7mZcg6TVI8IBKdeLHUC/e80iyVkufmqeu0udaFPWywyWJ4nhP10oi0ft1ftO+7XYzX4yDPoiRtsF6dtI3drjyaHVgWcDOWJIVGAJtLbdp5vcFLcboDlw4d2JC9if8wndMK9d4Kbb1P4+6v/ERaGozBFFntzuGRUAq5f5tsk9mh6D+g38xdHnK1tj1PcDIvw0DaRkD6/JL1rjHss+5sLSHCRtT7FG0ynQne1PjnEgUXL9M0xeeS7cV2hSxDU2ghZ7t8pzcEY8vJp/mWA7PHT07Nonp3yoh8dgqBvAa+sS6wqpiPBfQIDAQABo1AwTjAdBgNVHQ4EFgQURVRGXUUj2q6nPlqzvIKHtQx4VrAwHwYDVR0jBBgwFoAURVRGXUUj2q6nPlqzvIKHtQx4VrAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAOIndKJCOyi0qP0IK894er7/jGxV6XCEXY5PLlFa9ibnaPjusYXlMPn6rIjDUAkcMj/fVF0XYa862At1GWclS6S6yYDt06W/GoMknM5XsByxO5HzA7iuTc4MheUTdlvD05PtY6n3SXVQLTNp+zHdh/LlhI1d380DFDR8wZJzUnYJ+vb+2DU62+4gVytk0C6b4RNEK4kfHkQGdJyKnLjxtm66iJBP5w+cC1A0UdGx7xLv8EIVued0L9agJi5CCbly5UGXEGvGUZf7vSSMV0UM2tGbNY5vsZQX0aRl9NGZOsKBydY5FEgCk+SLYAHDq29EZZRcPE6dJqB1d5zLwUQ/vZg==</ds:X509Certificate>
                        <ds:X509SubjectName>CN=TI Trust Technologies srl,OU=Servizi per l'identita digitale,O=Telecom Italia Trust Technologies srl,L=Pomezia,ST=RM,C=IT</ds:X509SubjectName>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:KeyDescriptor use="signing">
                <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:X509Data>
                        <ds:X509Certificate>MIID0jCCArqgAwIBAgIUXDUOKL3WuolxDw96Fk9es8rIt6kwDQYJKoZIhvcNAQELBQAwgYsxCzAJBgNVBAYTAklUMS4wLAYDVQQKDCVUZWxlY29tIEl0YWxpYSBUcnVzdCBUZWNobm9sb2dpZXMgc3JsMSgwJgYDVQQLDB9TZXJ2aXppIHBlciBsJ2lkZW50aXRhIGRpZ2l0YWxlMSIwIAYDVQQDDBlUSSBUcnVzdCBUZWNobm9sb2dpZXMgc3JsMB4XDTIxMTExMTE3MDMyMFoXDTI1MTExMDE3MDMyMFowgYsxCzAJBgNVBAYTAklUMS4wLAYDVQQKDCVUZWxlY29tIEl0YWxpYSBUcnVzdCBUZWNobm9sb2dpZXMgc3JsMSgwJgYDVQQLDB9TZXJ2aXppIHBlciBsJ2lkZW50aXRhIGRpZ2l0YWxlMSIwIAYDVQQDDBlUSSBUcnVzdCBUZWNobm9sb2dpZXMgc3JsMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6sIS3+3iZSaAIyVywahlbpua2uJ/XmpV68P1e1STJpHoaj32STdHhqZnnb4Y/FshP1NUolzNolPXAYDmDduW1OnGndJZ+G9Hjh1PCkdiRw+p0FjhQAsGJkn8NdgTIHLJjqN1qQwtOsVGab8ScyA3mtmj3xKYuBhUoweuATzC7f5r7FfIoc3cy6N5lgrpZpfeAChxLwoHVjoAVgIBuemi6HAzmd4/BI06KzOcR7+dBVi4+uiseldxrJ5bhnjZKIwgkX14y9UA84Y+e+rMtyT8cT3XXi9NazZl5Ej5/bQPqqVsbg6tXzQSfEJD6JEjuYeC0RUKMS/EJn3hL5VLzTJ1NwIDAQABoywwKjAdBgNVHQ4EFgQUfctFZ8bRtmEvXPRlqgVDuggY/ZwwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEA0lszHadknPfE17IWGWsgvlXOdKMnWcl9H5rEYmsWwDB9FJG9XAZvPMcVv1kkWi6XZI/8N2Twhu1BdZkdvntDRscuck8wxxIpkRV7CwlcqNFZ/IwjDBxOBa8Q1J850p+qP8A9apsLLPUlu/oLygNDWIXzcOjMqnPkEP+XXUNYPto5iV+OyDzLLacCYqDDHcvDewWLmEjt35X967KcM+m7K2zGRLWfqcZPIjJJOkpNjgcs+MaisMrGDyOKiD16v0LpwVyIpTqXvDk7KHo8CUNXDxyLxZzB6WffgnOgjXTfU3vluweOx0qQy/VxIupDlNBKiZB4gnt1oAfnaMbqla9wcw==</ds:X509Certificate>
                        <ds:X509SubjectName>CN=TI Trust Technologies srl,OU=Servizi per l'identita digitale,O=Telecom Italia Trust Technologies srl,C=IT</ds:X509SubjectName>
                    </ds:X509Data>
                </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://login.id.tim.it/affwebservices/public/saml2slo"/>
            <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://login.id.tim.it/affwebservices/public/saml2slo"/>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://login.id.tim.it/affwebservices/public/saml2sso"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://login.id.tim.it/affwebservices/public/saml2sso"/>
            <ns2:Attribute xmlns:ns2="urn:oasis:names:tc:SAML:2.0:assertion" Name="spidCode" NameFormat="xsi:string"/>
            <ns3:Attribute xmlns:ns3="urn:oasis:names:tc:SAML:2.0:assertion" Name="name" NameFormat="xsi:string"/>
            <ns4:Attribute xmlns:ns4="urn:oasis:names:tc:SAML:2.0:assertion" Name="familyName" NameFormat="xsi:string"/>
            <ns5:Attribute xmlns:ns5="urn:oasis:names:tc:SAML:2.0:assertion" Name="placeOfBirth" NameFormat="xsi:string"/>
            <ns6:Attribute xmlns:ns6="urn:oasis:names:tc:SAML:2.0:assertion" Name="countyOfBirth" NameFormat="xsi:string"/>
            <ns7:Attribute xmlns:ns7="urn:oasis:names:tc:SAML:2.0:assertion" Name="dateOfBirth" NameFormat="xsi:string"/>
            <ns8:Attribute xmlns:ns8="urn:oasis:names:tc:SAML:2.0:assertion" Name="gender" NameFormat="xsi:string"/>
            <ns9:Attribute xmlns:ns9="urn:oasis:names:tc:SAML:2.0:assertion" Name="companyName" NameFormat="xsi:string"/>
            <ns10:Attribute xmlns:ns10="urn:oasis:names:tc:SAML:2.0:assertion" Name="registeredOffice" NameFormat="xsi:string"/>
            <ns11:Attribute xmlns:ns11="urn:oasis:names:tc:SAML:2.0:assertion" Name="fiscalNumber" NameFormat="xsi:string"/>
            <ns12:Attribute xmlns:ns12="urn:oasis:names:tc:SAML:2.0:assertion" Name="ivaCode" NameFormat="xsi:string"/>
            <ns13:Attribute xmlns:ns13="urn:oasis:names:tc:SAML:2.0:assertion" Name="idCard" NameFormat="xsi:string"/>
            <ns14:Attribute xmlns:ns14="urn:oasis:names:tc:SAML:2.0:assertion" Name="mobilePhone" NameFormat="xsi:string"/>
            <ns15:Attribute xmlns:ns15="urn:oasis:names:tc:SAML:2.0:assertion" Name="email" NameFormat="xsi:string"/>
            <ns16:Attribute xmlns:ns16="urn:oasis:names:tc:SAML:2.0:assertion" Name="address" NameFormat="xsi:string"/>
            <ns17:Attribute xmlns:ns17="urn:oasis:names:tc:SAML:2.0:assertion" Name="digitalAddress" NameFormat="xsi:string"/>
            <ns18:Attribute xmlns:ns18="urn:oasis:names:tc:SAML:2.0:assertion" Name="expirationDate" NameFormat="xsi:string"/>
        </md:IDPSSODescriptor>
        <md:Organization>
            <md:OrganizationName xml:lang="en">TI Trust Technologies srl</md:OrganizationName>
            <md:OrganizationDisplayName xml:lang="en">Trust Technologies srl</md:OrganizationDisplayName>
            <md:OrganizationURL xml:lang="en">https://www.trusttechnologies.it</md:OrganizationURL>
        </md:Organization>
    </md:EntityDescriptor>
    <!-- TIM ID *end* -->
</md:EntitiesDescriptor>`;
