import numbersData from '@/api/mocks/numbersData.json'
import PhoneInput from '@/shared/components/PhoneInput/ui'
import '@/shared/styles/index.scss'

const App = () => {
  const options = numbersData.data.items

  return (
    <>
      <PhoneInput
        masks={options}
        value="+7 800 555 35 - 35"
        onChange={console.log}
      />
      <PhoneInput
        masks={options}
        value="+7 800 555 35 - 35"
        onChange={console.log}
        disabled
      />
    </>
  )
}

export default App
