import {Button, useDooboo} from 'dooboo-ui';
import type {ReactElement} from 'react';
import {getString} from '../../STRINGS';

import styled from '@emotion/native';
import {useRouter} from 'expo-router';
import {View} from 'react-native';
import {maybeCompleteAuthSession, openAuthSessionAsync} from 'expo-web-browser';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '../../src/config';
import {makeRedirectUri} from 'expo-auth-session';
import {useAppContext} from '../../src/providers/AppProvider';
import {Heading1} from '../../src/uis/Typography';

// To close auth popup on web
maybeCompleteAuthSession();

const authorizationLogOutEndpoint = `https://${AUTH0_DOMAIN}/v2/logout`;

const redirectUri = makeRedirectUri({
  scheme: 'doobooexporouter',
  path: '/',
});

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  margin-bottom: 35px;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.View`
  width: 72%;
  max-width: 400px;
`;

type Props = {};

export default function Root({}: Props): ReactElement {
  const {changeThemeType} = useDooboo();
  const router = useRouter();

  const {
    state: {user},
    resetUser,
  } = useAppContext();

  const handleSignOut = async (): Promise<void> => {
    try {
      const res = await openAuthSessionAsync(
        `${authorizationLogOutEndpoint}?client_id=${AUTH0_CLIENT_ID}&returnTo=${redirectUri}`,
      );

      resetUser();
      if (res.type === 'success') {
      }

      // handle unsetting your user from store / context / memory
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <View style={{marginTop: 80}}>
        {user ? (
          <View style={{marginBottom: 30}}>
            <Heading1>Welcome {user.displayName}!</Heading1>
          </View>
        ) : null}
      </View>
      <ButtonWrapper>
        {user ? (
          <Button text="logout" onPress={handleSignOut} />
        ) : (
          <Button
            onPress={(): void => {
              router.push('/(auth)/sign-in');
            }}
            text={getString('LOGIN')}
          />
        )}
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-theme"
          onPress={(): void => changeThemeType()}
          text={getString('CHANGE_THEME')}
        />
      </ButtonWrapper>
    </Container>
  );
}
