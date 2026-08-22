export const DemoPNgCSSTheme = {

  components: {
    button: {
      // workaround because of the error in primeng. Tokens `button.sm.font.size` and `button.sm.font.size` are well
      // documented but nonfunctional.
      css: ({ dt }: { dt: (token: string) => string | number | undefined } = { dt: () => undefined }) => `
        p-button button:not(.p-button-large)  .p-button-label,
        button.p-button:not(.p-button-large) .p-button-label,
        button.p-button:not(.p-button-large) {
          font-size: ${dt('button.sm.font.size')};
        }
        p-button button.p-button-large  .p-button-label,
        button.p-button.p-button-large .p-button-label,
        button.p-button.p-button-large {
          font-size: ${dt('button.lg.font.size')};
        }
      `
    },
    inputtext: {
      css: ({ dt }: { dt: (token: string) => string | number | undefined } = { dt: () => undefined }) => `
        .p-inputtext.ng-invalid {
          color: ${dt('inputtext.invalid.text.color')};
        }
      `
    },
    password: {
      css: ({ dt }: { dt: (token: string) => string | number | undefined } = { dt: () => undefined }) => `
        input.p-password-input.ng-invalid {
          color: ${dt('password.invalid.text.color')};
        }
        input:is(:-webkit-autofill, :autofill):is(.p-password-input.ng-invalid) {
          transition: color 5000s ease-in-out 0s;
          -webkit-text-fill-color: ${dt('password.invalid.text.color')} !important;
          text-fill-color: ${dt('password.invalid.text.color')}  !important;
          color: ${dt('password.invalid.text.color')} !important;
        }
      `
    },
  },
};
