import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const EditScheduleModal = ({ isOpen, schedule, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: '',
    day: '월',
    startTime: { hour: '09', minute: '00' },
    endTime: { hour: '10', minute: '00' },
  });

  useEffect(() => {
    if (schedule) {
      setForm({
        title: schedule.title || '',
        day: schedule.day || '월',
        startTime: {
          hour: String(schedule.startTime.hour).padStart(2, '0'),
          minute: String(schedule.startTime.minute).padStart(2, '0'),
        },
        endTime: {
          hour: String(schedule.endTime.hour).padStart(2, '0'),
          minute: String(schedule.endTime.minute).padStart(2, '0'),
        },
      });
    }
  }, [schedule]);

  if (!isOpen || !schedule) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('startTime') || name.startsWith('endTime')) {
      const [key, sub] = name.split('.');
      setForm((prev) => ({
        ...prev,
        [key]: { ...prev[key], [sub]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...schedule,
      ...form,
      startTime: {
        hour: form.startTime.hour,
        minute: form.startTime.minute,
      },
      endTime: {
        hour: form.endTime.hour,
        minute: form.endTime.minute,
      },
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <form
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: 24,
          minWidth: 280,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3>일정 수정</h3>
        <label>
          제목
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          요일
          <select name="day" value={form.day} onChange={handleChange}>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label>
          시작 시간
          <input
            name="startTime.hour"
            type="number"
            min="0"
            max="23"
            value={form.startTime.hour}
            onChange={handleChange}
            style={{ width: 40 }}
          />
          :
          <input
            name="startTime.minute"
            type="number"
            min="0"
            max="59"
            step="15"
            value={form.startTime.minute}
            onChange={handleChange}
            style={{ width: 40 }}
          />
        </label>
        <label>
          종료 시간
          <input
            name="endTime.hour"
            type="number"
            min="0"
            max="23"
            value={form.endTime.hour}
            onChange={handleChange}
            style={{ width: 40 }}
          />
          :
          <input
            name="endTime.minute"
            type="number"
            min="0"
            max="59"
            step="15"
            value={form.endTime.minute}
            onChange={handleChange}
            style={{ width: 40 }}
          />
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button
            type="submit"
            style={{
              flex: 1,
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: 8,
            }}
          >
            저장
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, background: '#eee', border: 'none', borderRadius: 4, padding: 8 }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

EditScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  schedule: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditScheduleModal;
