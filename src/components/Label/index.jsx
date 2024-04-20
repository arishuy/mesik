import { styled } from '@mui/material/styles'

const LabelWrapper = styled('span')(
  ({ theme }) => `  
      background-color: ${theme.palette.grey[100]};
      padding: 2px 8px;
      font-size: ${theme.typography.pxToRem(13)};
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: 20px;
      
      &.MuiLabel {
        &-primary {
          background-color: ${theme.palette.primary.lighter};
          color: ${theme.palette.primary.main}
        }

        &-black {
          background-color: ${theme.palette.grey[900]};
          color: ${theme.palette.grey[50]};
        }
        
        &-secondary {
          background-color: ${theme.palette.secondary.lighter};
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          background-color: ${theme.palette.success.lighter};
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          background-color: ${theme.palette.warning.lighter};
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          background-color: ${theme.palette.error.lighter};
          color: ${theme.palette.error.main}
        }
        
        &-info {
          background-color: ${theme.palette.info.lighter};
          color: ${theme.palette.info.main}
        }
      }
`
)

const Label = ({ className, color = 'secondary', children, ...rest }) => {
  return (
    <LabelWrapper className={'MuiLabel-' + color} {...rest}>
      {children}
    </LabelWrapper>
  )
}

export default Label
