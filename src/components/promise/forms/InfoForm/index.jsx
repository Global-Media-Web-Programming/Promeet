import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PromiseSchema } from '@/schemas/promise';
import { ROUTES } from '@/constants/routes';

const InfoForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
    // watch, // 디버깅용
  } = useForm({
    resolver: zodResolver(PromiseSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      memberCnt: 2,
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (formData) => {
    console.log(formData);
    navigate(ROUTES.PROMISE_CREATE_DATE);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          label="이름"
          {...register('name')}
          placeholder="약속 이름을 입력해주세요"
        />
        {touchedFields.name && errors.name && errors.name.message && <p>{errors.name.message}</p>}
      </S.InputWrapper>

      <S.InputWrapper>
        <label htmlFor="description">설명</label>
        <input
          type="text"
          id="description"
          label="이름"
          {...register('description')}
          placeholder="약속 설명을 입력해주세요"
        />
        {touchedFields.description && errors.description && errors.description.message && (
          <p>{errors.description.message}</p>
        )}
      </S.InputWrapper>

      <S.InputWrapper>
        <label>참여 인원</label>
        <div></div>
      </S.InputWrapper>

      <button disabled={Object.keys(errors).length > 0 || isSubmitting}>
        {isSubmitting ? '저장 중...' : '다음'}
      </button>
    </S.Form>
  );
};

export default InfoForm;
