import styled from '@emotion/native';
import {Button, EditText} from 'dooboo-ui';
import {Link} from 'expo-router';
import type {ReactElement} from 'react';
import {useState} from 'react';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateSignUp = (): void => {};

  return (
    <Container>
      <Heading1>{getString('LOGIN')}</Heading1>
      <StyledLink href="/">
        <Body1>{getString('NAVIGATE', {name: 'Home'})}</Body1>
      </StyledLink>

      <EditText
        placeholder={getString('EMAIL')}
        value={email}
        onChangeText={setEmail}
        style={{marginTop: 20, marginBottom: 24, paddingHorizontal: 36}}
      />

      <EditText
        placeholder={getString('PASSWORD')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{marginBottom: 24, paddingHorizontal: 36}}
      />

      <Button
        text={getString('LOGIN')}
        style={{width: '50%', marginBottom: 20}}
      />
      <Button
        text={getString('SIGNUP')}
        style={{width: '50%'}}
        onPress={handleNavigateSignUp}
      />
    </Container>
  );
}
