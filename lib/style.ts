import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
  },
});
