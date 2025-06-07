import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { usePromiseDataActions } from '@/hooks/stores/promise/usePromiseDataStore';
import { PromiseSchema } from '@/schemas/promise';
import { ROUTES } from '@/constants/routes';
import { MEMBER_CNT_MIN, MEMBER_CNT_MAX } from '@/constants/promise';

const InfoForm = () => {
  const navigate = useNavigate();
  const { setName, setDescription, setMemberCnt } = usePromiseDataActions();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
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
    const { name, description, memberCnt } = formData;
    setName(name);
    setDescription(description);
    setMemberCnt(memberCnt);
    navigate(ROUTES.PROMISE_CREATE_DATE);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        id="name"
        name="name"
        label="이름"
        height="110px"
        useForm
        control={control}
        placeholder="약속 이름을 입력해주세요"
      />
      <Input
        type="text"
        id="description"
        name="description"
        label="설명"
        height="110px"
        useForm
        control={control}
        placeholder="약속 설명을 입력해주세요"
      />

      <S.MembersCountInput>
        <Input
          type="number"
          id="memberCnt"
          name="memberCnt"
          label="참여 인원 수 (본인 포함)"
          height="110px"
          useForm
          isNumber
          control={control}
          min={MEMBER_CNT_MIN}
          max={MEMBER_CNT_MAX}
        />
      </S.MembersCountInput>

      <Button disabled={Object.keys(errors).length > 0 || isSubmitting}>
        {isSubmitting ? '저장 중...' : '다음'}
      </Button>
    </S.Form>
  );
};

export default InfoForm;
