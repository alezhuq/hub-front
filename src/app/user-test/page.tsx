'use client'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;
  margin: 30px auto;
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  width: fit-content;
  margin: 0 auto;
`

const UserTestPage: React.FC = () => {
  const router = useRouter()
  return (
    <Container>
      <Inner>
        <h1>Пройдіть короткий тест</h1>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Як часто ви відчуваєте стрес у повсякденному житті?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="not_often"
              control={<Radio />}
              label="Зовсім не часто"
            />
            <FormControlLabel value="sometimes" control={<Radio />} label="Іноді" />
            <FormControlLabel value="partially" control={<Radio />} label="Частково" />
            <FormControlLabel value="often" control={<Radio />} label="Часто" />
            <FormControlLabel value="very_often" control={<Radio />} label="Дуже часто" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Як ви оцінюєте свою здатність управляти емоціями?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel value="very_well" control={<Radio />} label="Дуже добре" />
            <FormControlLabel value="well" control={<Radio />} label="Добре" />
            <FormControlLabel value="so_so" control={<Radio />} label="Так собі" />
            <FormControlLabel value="poorly" control={<Radio />} label="Погано" />
            <FormControlLabel
              value="very_poorly"
              control={<Radio />}
              label="Дуже погано"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Чи можете ви ефективно впоратися з труднощами і стресами?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel value="always" control={<Radio />} label="Так, завжди" />
            <FormControlLabel value="usually" control={<Radio />} label="Зазвичай так" />
            <FormControlLabel
              value="a_bit_difficult"
              control={<Radio />}
              label="Трошки важко"
            />
            <FormControlLabel
              value="try_but_difficult"
              control={<Radio />}
              label="Спробую, але це складно"
            />
            <FormControlLabel value="no_cannot" control={<Radio />} label="Ні, не можу" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Як ви відчуваєте рівень свого енергетичного заряду?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel value="high" control={<Radio />} label="Високий" />
            <FormControlLabel value="medium" control={<Radio />} label="Середній" />
            <FormControlLabel value="low" control={<Radio />} label="Низький" />
            <FormControlLabel
              value="usually_exhausted"
              control={<Radio />}
              label="Зазвичай виснажений"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Чи відчуваєте ви задоволеність своєю роботою/навчанням?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel value="fully" control={<Radio />} label="Так, повністю" />
            <FormControlLabel
              value="yes_but_difficulties"
              control={<Radio />}
              label="Так, але є певні труднощі"
            />
            <FormControlLabel value="indifferent" control={<Radio />} label="Байдуже" />
            <FormControlLabel
              value="not_satisfied"
              control={<Radio />}
              label="Ні, не задоволений/задоволена"
            />
            <FormControlLabel value="neutral" control={<Radio />} label="Нейтрально" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Як ви відноситесь до соціальних взаємин?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="very_positive"
              control={<Radio />}
              label="Дуже позитивно"
            />
            <FormControlLabel value="positive" control={<Radio />} label="Позитивно" />
            <FormControlLabel value="neutral" control={<Radio />} label="Нейтрально" />
            <FormControlLabel value="negative" control={<Radio />} label="Негативно" />
            <FormControlLabel
              value="very_negative"
              control={<Radio />}
              label="Дуже негативно"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Як часто ви відчуваєте радість або задоволення від повсякденних справ?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel value="often" control={<Radio />} label="Часто" />
            <FormControlLabel value="sometimes" control={<Radio />} label="Іноді" />
            <FormControlLabel value="rarely" control={<Radio />} label="Рідко" />
            <FormControlLabel
              value="almost_never"
              control={<Radio />}
              label="Майже ніколи"
            />
            <FormControlLabel
              value="never"
              control={<Radio />}
              label="Зовсім не відчуваю"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Чи маєте ви бажання спілкуватися з оточуючими вас людьми?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel value="always" control={<Radio />} label="Завжди" />
            <FormControlLabel value="often" control={<Radio />} label="Часто" />
            <FormControlLabel value="sometimes" control={<Radio />} label="Іноді" />
            <FormControlLabel value="rarely" control={<Radio />} label="Рідко" />
            <FormControlLabel value="never" control={<Radio />} label="Ні, ніколи" />
          </RadioGroup>
        </FormControl>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => router.push('/account')}
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              backgroundColor: '#171717',
              color: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: '#171717',
                color: 'rgba(255, 255, 255, 0.9)',
              },
            }}
            variant="contained"
            size="large"
          >
            Відправити результати
          </Button>
        </div>
      </Inner>
    </Container>
  )
}

export default UserTestPage
