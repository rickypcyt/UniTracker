import { useEffect, useState } from "react";

import { setCalendarVisibility } from "@/store/slices/uiSlice";
import { useDispatch } from "react-redux";

export const useTaskDetails = () => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [taskDetailsEdit, setTaskEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Abre el modal de detalles y edita la tarea seleccionada
  const handleOpenTaskDetails = (task) => {
    setSelectedTask(task);
    setEditedTask(task);
    setTaskEditing(true);
    setSelectedTaskId(task.id);
    dispatch(setCalendarVisibility(false)); // Oculta el calendario si está abierto
  };

  // Cierra el modal de detalles
  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setTaskEditing(false);
    setSelectedTaskId(null);
    dispatch(setCalendarVisibility(true)); // Muestra el calendario si estaba oculto
  };

  // Actualiza los campos de la tarea editada
  const handleEditTaskField = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Sincroniza el editedTask si cambia la tarea seleccionada
  useEffect(() => {
    setEditedTask(selectedTask);
  }, [selectedTask]);

  return {
    selectedTask,
    editedTask,
    taskDetailsEdit,
    setTaskEditing,
    handleOpenTaskDetails,
    handleCloseTaskDetails,
    handleEditTaskField,
    setEditedTask,
    selectedTaskId,
  };
};
