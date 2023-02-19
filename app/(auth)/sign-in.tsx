import styled from '@emotion/native';
import {Button} from 'dooboo-ui';
import {Link, useRouter} from 'expo-router';
import type {ReactElement} from 'react';
import {useEffect} from 'react';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';
import {makeRedirectUri, useAuthRequest, ResponseType} from 'expo-auth-session';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '../../src/config';
import {maybeCompleteAuthSession} from 'expo-web-browser';
import {useAppContext} from '../../src/providers/AppProvider';
import jwtDecoder from 'jwt-decode';

// To close auth popup on web
maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
};

/*
  makeRedirectUri with useProxy uses expo proxy service 
  - https://docs.expo.dev/guides/authentication/#expo-proxy
*/
const redirectUri = makeRedirectUri({
  scheme: 'doobooexporouter',
});

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
`;

export default function SignIn(): ReactElement {
  const router = useRouter();
  const {setUser} = useAppContext();

  const [request, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId: AUTH0_CLIENT_ID,
      responseType: ResponseType.IdToken,
      scopes: ['openid', 'profile', 'email'],

      extraParams: {
        // connection: 'google-oauth2',
        connection: 'Username-Password-Authentication',
        nonce: 'nonce',
      },
    },
    discovery,
  );

  const handleNavigateSingIn = (): void => {
    promptAsync();
  };

  useEffect(() => {
    if (!result || result.type !== 'success') {
      return;
    }

    const data = jwtDecoder(result.params.id_token) as {nickname: string};

    setUser({displayName: data.nickname});
  }, [result, setUser, router]);

  return (
    <Container>
      <Heading1>{getString('LOGIN')}</Heading1>
      <StyledLink href="/" style={{marginBottom: 30}}>
        <Body1>{getString('NAVIGATE', {name: 'Home'})}</Body1>
      </StyledLink>

      <Button
        disabled={!request}
        text={getString('LOGIN')}
        style={{width: '50%', maxWidth: 400, marginBottom: 20}}
        onPress={handleNavigateSingIn}
      />
    </Container>
  );
}
