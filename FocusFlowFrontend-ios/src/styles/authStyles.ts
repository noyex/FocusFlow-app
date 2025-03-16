import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.1,
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 4,
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
  footerLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : undefined,
  },
}); 