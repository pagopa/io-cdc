import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";

export const aSAMLResponse =
  `<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" Version="2.0" ID="id_d35d052d2ae5229fc0c4adcb920b2cad46d49b8b" IssueInstant="2025-06-24T07:20:49Z" Destination="https://localhost:8080/sm/assertionConsumerService" InResponseTo="_42cd894a98832b64f6dc">
  <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity" NameQualifier="https://spid-testenv2:8088">https://spid-testenv2:8088</saml:Issuer><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference URI="#id_d35d052d2ae5229fc0c4adcb920b2cad46d49b8b"><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>rUT9Iak5/hzAcrmjR/g7D0uLIn0VWdjm1E9RsJ1lVqQ=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>JKO4tGf0QyeMYF/L4Yb4rdv4VWB6AnoNDsbwlsxeknmebDdcAKKmxjrmzasv+uwOgB09SnESVsmcWyj+JJupq0khGSWODtgUwDbFohreQ5EFl+UA8xXptRwIK3bZrmoNFiSYy90wyFwEr5Sn61Czt4Lhorkned6QnPGKbi0lfUETcXaPxtbCaNB+x4ZSagz4y9IR28lcMWAUzjw9dIpC30Ln0czejCmyMthhu0CD2AGlbhQwXwLQ5OoHWek+e8CYIEV3ny8XHNfbaYU++SFO5cPeBUuLQxb1G5EHjqMnYi7f1es3zoXdm+5/9n/Xcow1VOnDM0tOECs5fskOALJLcIgy08t5NjKzqnufXXnmbo1DdIlRjN50z1fiqkJZVRux62ZrAIICKWGqh7prI7qBKvpNzpnEliZue+hj/8poh2O2NmEXIIUMaNBh5vaJAT3YxOmWRMGs4rP8AJlvxYTeZJC7/xpEHX8v+k90F7SGIr1WMBjlSiHpitEyzo88nidMjiViWg7wy1gFKi+O+4nkbWwHo0/GK8DiaTnHSFQlc/F8IO9PD4YDt3mIeTE40INn5X2N5ICsZxY5rgR39TeicROea4qB6xZQUGxsMHr5MmRNiUH8isfMtQaNqlBvercPGrXtF5JvzqLFbAB6tas3d/NqofNsbUpPY0iaPpyPd3k=</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>MIIFvTCCA6WgAwIBAgIUOeEZgLd9qO9ud4XdjnbwpaFQGfIwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ0wCwYDVQQHDARSb21l
MQ0wCwYDVQQKDARBQ01FMRYwFAYDVQQLDA1JVCBEZXBhcnRtZW50MRkwFwYDVQQD
DBBhcGkuaXRhbGlhLmxvY2FsMB4XDTI0MDUwODA5NDM0MFoXDTI1MDUwODA5NDM0
MFowbjELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ0wCwYDVQQHDARSb21l
MQ0wCwYDVQQKDARBQ01FMRYwFAYDVQQLDA1JVCBEZXBhcnRtZW50MRkwFwYDVQQD
DBBhcGkuaXRhbGlhLmxvY2FsMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
AgEArJEhHKt8CGZu6v6OxCBc8OxE0kFqoyd98K3bOArvuPiVG7asaYm1w/xwthRn
q/w7Q2tLW3pOwN/djkQdcJxDdsnFdwPbFu5ik4HfNUkHkpTkJMlJvAvtshSnzY0A
OJU0cf++AEG7tURns7fRPMN+I6qDPPC1UmXdwXf97Ut9K9JnuSAz7dSMjjaldWKl
wP/A1KZNWkpf/GBihNYYC9XI2VKROZksdaRyKfduXmL35uth92GVa1AdnCizIkI1
EsDBCPpEOLEgNdG8+UQK7YdBMk10Q6GLgSoAYbzuKbJ9z6WC2XLbeJ5NSWaqmwKZ
pXzbnWd04zujLWaYudgb+U/c4h1wn6UmFrwFKvBDTP09bVyCymOBapFHT3mqQC2h
gORqMJigHLJOrehxWUcsTFvA/qmt2Cih68JPdwudUpT6S7o3Ikj+4pymxJjxj5ED
11ePGdkdq9QEGQTq0SrHCQRz3gbz+3OExSo3hSdlfuKkCtNHB4sgAF21mnEm1lla
sdqMJGiVKl+sltxxIp6h2Ditnue5cPZkmJSlgrKuJLFqzVkmnaHP/WiG2fdhWz/5
gMZtWhZ3Qsh34OWdu5d5zY5nlffbqP8+TggrrJyksyZ3g7aTsKeccjact+FPUIOr
M9iGgZMyy6f06rmEfBI9amwpnx4+aLtYmNLAuu3wMAutT5kCAwEAAaNTMFEwHQYD
VR0OBBYEFEQ7ChdGZYFnhC6oZ8VDLSB3W1hoMB8GA1UdIwQYMBaAFEQ7ChdGZYFn
hC6oZ8VDLSB3W1hoMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggIB
AJiWxu2rV+N8Bdhk/lu5BY3tOunNHOEDd74cZsNa44ia67RQgkFbUbB2byqHQxHT
D8hgZK+VUdmRnCKrJPwcqS7wid1uOjiDgqcW5QtOVle8w9SsSFwWa3WGISjs+XpV
NgqK6GJOZzA99q/x91FEjeqpVKOfa4E6IPsze+FsQrYBcwATztQRGHlev8RxGNeQ
DN38tNcIG3Z50NQfuLyLxM30Sk3WebACu/QkEth4DvSS98MuIBmvar0rnrObeGuN
qFbyxaqSS2J1mQtFAUQ0lDg3lVZMrMrev1JczHW6MFrVG7FyMhkbeHne/dgjExiW
/8DxH01sYPtYBBdh0kbCzTQzEhpSfhKtG9+Mp7+t4lpOFwkR6l6XkJXaZ2UrODuu
Ks3p7nLnT1uOJ3IA7gwuJdlsl/jQUpWdFj4Glb6L8pBDP8tTx8c/IDsxV3jddFhT
2hFkvxBpE0OhHcVnQSgpBk+1gMEUGL/S94OA/0XLkGLMkXAolUjcS4b+OUFqMbz+
CSxseb7MUagwRS8uKGxrgZnwjWHlTXo4nt7/Wk0g5VcLLXaXRfy4O4XgT2QG1wK8
kIu4lrwWQKPgMdPVNy6z0TL99EoLVfe1x45rSlYvkgvjU1Ihc0jWpwsLO0N6PcMj
t/UztKD60B4TDsPS+0gxawQcwx9AFh6iveD9pXd9f5Yq
</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature>
  <samlp:Status>
    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
  </samlp:Status>
  <saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="2.0" ID="id_0dfa4974bb84aa1e73ba7d609312226275f9e49c" IssueInstant="2025-06-24T07:20:49Z">
    <saml:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity" NameQualifier="https://spid-testenv2:8088">https://spid-testenv2:8088</saml:Issuer><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference URI="#id_0dfa4974bb84aa1e73ba7d609312226275f9e49c"><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>lhUfFFMO6xI1+Q4X069YKwhgPPag903iOO1snbUJ3eg=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>e+YoBcqugvFUSM5ajHr0w819jHA8ER1UWxUBxkKIlpBjSDoneDVWq9los+BFBdaqiHK5oxwfPjmp+so9rxAYgiqvO04yKBoWUTq+A96XH/xko6O/+xAZ20XlVOKmsPv5y4bH9C+3U6EPaGDfdXJ6gf0XdjoyK/qIruatXGj191siyLBzneFMYQLFbKzt4WK6jVQRKESpVrTH3OfRq1yVgSobpxYp1kdi/Aomi3C0DAYk27JSl78anr1drIHy26fASD+PccEYSzB8t7f1ryQxNGnaOFAty5giHTLuxwDSNR3P8Z7L3Ax3RACvG4sulQ0eSpE3kFdNXBTBkGg8oRX/YXBFicrcdnA/fhdn0S50Aprp3OT6IHQtONpc5f/mVwc0ZQKFc9ESWy79rKrw1Rd99MGqfgeoJWWUz4Kp023UVWS4Ukj3L7XwTtZuU09SZZm6iCTyt5HebNd2eZnPyIl6sn2KnkXKJNhLvmGdLq3eBMquATlWS1LkOqASC1f7PO4pKkL1CxluxPDPxZ7T5EL2w2URSAfcBUQFUAcMfOU19sZ8dEdo03VVRop04qXRBOKL8TXrgnsIxTQ9TlkrZeMxWUSCJ+UXmC9sH2wtW+SvGau60DQFfcv+YuvdAYwgMxrv77R7AbCYJoClAVB8EAPhJlBIZt+K5EywRESZb8ktzJE=</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>MIIFvTCCA6WgAwIBAgIUOeEZgLd9qO9ud4XdjnbwpaFQGfIwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ0wCwYDVQQHDARSb21l
MQ0wCwYDVQQKDARBQ01FMRYwFAYDVQQLDA1JVCBEZXBhcnRtZW50MRkwFwYDVQQD
DBBhcGkuaXRhbGlhLmxvY2FsMB4XDTI0MDUwODA5NDM0MFoXDTI1MDUwODA5NDM0
MFowbjELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ0wCwYDVQQHDARSb21l
MQ0wCwYDVQQKDARBQ01FMRYwFAYDVQQLDA1JVCBEZXBhcnRtZW50MRkwFwYDVQQD
DBBhcGkuaXRhbGlhLmxvY2FsMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
AgEArJEhHKt8CGZu6v6OxCBc8OxE0kFqoyd98K3bOArvuPiVG7asaYm1w/xwthRn
q/w7Q2tLW3pOwN/djkQdcJxDdsnFdwPbFu5ik4HfNUkHkpTkJMlJvAvtshSnzY0A
OJU0cf++AEG7tURns7fRPMN+I6qDPPC1UmXdwXf97Ut9K9JnuSAz7dSMjjaldWKl
wP/A1KZNWkpf/GBihNYYC9XI2VKROZksdaRyKfduXmL35uth92GVa1AdnCizIkI1
EsDBCPpEOLEgNdG8+UQK7YdBMk10Q6GLgSoAYbzuKbJ9z6WC2XLbeJ5NSWaqmwKZ
pXzbnWd04zujLWaYudgb+U/c4h1wn6UmFrwFKvBDTP09bVyCymOBapFHT3mqQC2h
gORqMJigHLJOrehxWUcsTFvA/qmt2Cih68JPdwudUpT6S7o3Ikj+4pymxJjxj5ED
11ePGdkdq9QEGQTq0SrHCQRz3gbz+3OExSo3hSdlfuKkCtNHB4sgAF21mnEm1lla
sdqMJGiVKl+sltxxIp6h2Ditnue5cPZkmJSlgrKuJLFqzVkmnaHP/WiG2fdhWz/5
gMZtWhZ3Qsh34OWdu5d5zY5nlffbqP8+TggrrJyksyZ3g7aTsKeccjact+FPUIOr
M9iGgZMyy6f06rmEfBI9amwpnx4+aLtYmNLAuu3wMAutT5kCAwEAAaNTMFEwHQYD
VR0OBBYEFEQ7ChdGZYFnhC6oZ8VDLSB3W1hoMB8GA1UdIwQYMBaAFEQ7ChdGZYFn
hC6oZ8VDLSB3W1hoMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggIB
AJiWxu2rV+N8Bdhk/lu5BY3tOunNHOEDd74cZsNa44ia67RQgkFbUbB2byqHQxHT
D8hgZK+VUdmRnCKrJPwcqS7wid1uOjiDgqcW5QtOVle8w9SsSFwWa3WGISjs+XpV
NgqK6GJOZzA99q/x91FEjeqpVKOfa4E6IPsze+FsQrYBcwATztQRGHlev8RxGNeQ
DN38tNcIG3Z50NQfuLyLxM30Sk3WebACu/QkEth4DvSS98MuIBmvar0rnrObeGuN
qFbyxaqSS2J1mQtFAUQ0lDg3lVZMrMrev1JczHW6MFrVG7FyMhkbeHne/dgjExiW
/8DxH01sYPtYBBdh0kbCzTQzEhpSfhKtG9+Mp7+t4lpOFwkR6l6XkJXaZ2UrODuu
Ks3p7nLnT1uOJ3IA7gwuJdlsl/jQUpWdFj4Glb6L8pBDP8tTx8c/IDsxV3jddFhT
2hFkvxBpE0OhHcVnQSgpBk+1gMEUGL/S94OA/0XLkGLMkXAolUjcS4b+OUFqMbz+
CSxseb7MUagwRS8uKGxrgZnwjWHlTXo4nt7/Wk0g5VcLLXaXRfy4O4XgT2QG1wK8
kIu4lrwWQKPgMdPVNy6z0TL99EoLVfe1x45rSlYvkgvjU1Ihc0jWpwsLO0N6PcMj
t/UztKD60B4TDsPS+0gxawQcwx9AFh6iveD9pXd9f5Yq
</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature>
    <saml:Subject>
      <saml:NameID Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient" NameQualifier="https://spid-testenv2:8088">id_055fc87b961ea4ba138cecdab967055f38b4e5d2</saml:NameID>
      <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml:SubjectConfirmationData Recipient="https://localhost:8080/sm/assertionConsumerService" NotOnOrAfter="2025-06-24T07:22:49Z" InResponseTo="_42cd894a98832b64f6dc"/>
      </saml:SubjectConfirmation>
    </saml:Subject>
    <saml:Conditions NotBefore="2025-06-24T07:18:49Z" NotOnOrAfter="2025-06-24T07:22:49Z">
      <saml:AudienceRestriction>
        <saml:Audience>https://spid.agid.gov.it/cd</saml:Audience>
      </saml:AudienceRestriction>
    </saml:Conditions>
    <saml:AuthnStatement AuthnInstant="2025-06-24T07:20:49Z" SessionIndex="id_a71b40c0dc315ebc55026332b9ca1ac441962799">
      <saml:AuthnContext>
        <saml:AuthnContextClassRef>https://www.spid.gov.it/SpidL2</saml:AuthnContextClassRef>
      </saml:AuthnContext>
    </saml:AuthnStatement>
    <saml:AttributeStatement>
      <saml:Attribute Name="email">
        <saml:AttributeValue xsi:type="xs:string">cittadinanzadigitale@teamdigitale.governo.it</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="name">
        <saml:AttributeValue xsi:type="xs:string">Carla</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="familyName">
        <saml:AttributeValue xsi:type="xs:string">Rossi</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="fiscalNumber">
        <saml:AttributeValue xsi:type="xs:string">ISPXNB32R82Y766D</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="dateOfBirth">
        <saml:AttributeValue xsi:type="xs:date">2000-12-12</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>` as NonEmptyString;
