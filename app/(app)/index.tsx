import {Button, useDooboo} from 'dooboo-ui';
import type {ReactElement} from 'react';
import {getString} from '../../STRINGS';

import styled from '@emotion/native';
import {useRouter} from 'expo-router';
import {View} from 'react-native';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  margin-bottom: 35px;

  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

type Props = {};

export default function Root({}: Props): ReactElement {
  const {changeThemeType} = useDooboo();
  const router = useRouter();

  return (
    <Container>
      <Button
        testID="btn-theme"
        style={{width: '72%'}}
        onPress={(): void => changeThemeType()}
        text={getString('CHANGE_THEME')}
      />
      <View style={{marginTop: 12}} />
      <Button
        style={{width: '72%'}}
        onPress={(): void => {
          router.push('/(auth)/sign-in');
        }}
        text={getString('LOGIN')}
      />
    </Container>
  );
}
