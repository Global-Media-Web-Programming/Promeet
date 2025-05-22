import * as S from './style';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import useBottomSheetStore from '@/stores/ui/useBottomSheetStore';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const bottomSheetVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

/**
 * BottomSheet 컴포넌트
 *
 * @param {string} id - 바텀시트 종류 구분 id
 * @param {node} children - 구성 요소
 */
const BottomSheet = ({ id, children }) => {
  const { activeBottomSheet, setActiveBottomSheet } = useBottomSheetStore();
  const isOpen = activeBottomSheet === id;

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={() => setActiveBottomSheet(null)}
        >
          <S.BottomSheet
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bottomSheetVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <S.BottomSheetHeader>
              <S.lineIcon />
            </S.BottomSheetHeader>
            <S.BottomSheetContent>{children}</S.BottomSheetContent>
          </S.BottomSheet>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

BottomSheet.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default BottomSheet;

/**
 * 사용 예시
 * import { BottomSheet, Button } from '@/components'
 *
 * <Button onClick={() => setActiveBottomSheet('sheet1')}>Open Sheet 1</Button>
 *
 * <BottomSheet id="sheet1" >
 *  <S.Content>
 *    blabla
 *  </S.Content>
 * </BottomSheet>
 */
