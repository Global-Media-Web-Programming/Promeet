import * as S from './style';
import { AnimatePresence, motion } from 'framer-motion';

const skeletonVariants = {
  pulse: {
    opacity: [0.6, 0.8, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const PlaceCardSkeleton = () => {
  return (
    <AnimatePresence mode="wait">
      <S.PlaceCard
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <S.CardLeft>
          <S.CardHeaderWrapper>
            <S.SkeletonName as={motion.div} variants={skeletonVariants} animate="pulse" />
          </S.CardHeaderWrapper>
          <S.SkeletonAddress as={motion.div} variants={skeletonVariants} animate="pulse" />
        </S.CardLeft>
      </S.PlaceCard>
    </AnimatePresence>
  );
};

export default PlaceCardSkeleton;
