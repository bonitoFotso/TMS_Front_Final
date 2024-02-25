// TaskDialog.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
    Dialog,
    Button,
    Switch,
    TextField,
    DialogTitle,
    DialogContent,
    CircularProgress,
    FormControlLabel,
} from '@mui/material';

import API_URL from 'src/config';

import TechAvatar from './TechAvatar';





const TaskDialog = ({ task, onClose, onOpen }) => {
    const [loading, setLoading] = useState(true);
    const [taskData, setTaskData] = useState({});
    const [report, setReport] = useState('');
    const [reportExists, setReportExists] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [ok, setOk] = useState(false);
    const { assignations } = task;
    const [techsRapport, setTechsRapport] = useState(assignations);

    const names = techsRapport.map(item => item.name);
    console.log(names);
    const technicienListAsString = JSON.stringify(names);

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await axios.get(`${API_URL}/taches/${task.id}`);
                setTaskData(response.data);
                setIsCompleted(response.data.ok);
                setTechsRapport(response.data.assignations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching task data:', );
                setLoading(false);
            }
        };
        const fetchTaskReportData = async () => {
            try {
                const response = await axios.get(`${API_URL}/taches/${task.id}/rapport`);
                setReport(response.data);
                setReportExists(response.data !== null && response.data !== '');
                console.log(setReportExists,'ll');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rapport data:');
                setReportExists(false)
                setLoading(false);
            }
        };

        fetchTaskData();
        fetchTaskReportData();
    }, [task.id]);

    const handleReportChange = (event) => {
        setReport(event.target.value);
    };



    const handleSwitchChange = (event) => {
        setIsCompleted(event.target.checked);
        setOk(event.target.checked)
    };

    const handleSave = async () => {
        try {
            if (reportExists) {
                // Mettez à jour le rapport existant

                await axios.put(`${API_URL}/taches/${report.id}/rapport/update/`, { tache: task.id, rapport_text: report, ok, technicien_list: technicienListAsString });
            } else {
                // Créez un nouveau rapport
                console.log(technicienListAsString);
                await axios.post(`${API_URL}/taches/${task.id}/rapport/create/`, { tache: task.id, rapport_text: report, ok, technicien_list: technicienListAsString });
            }

            // Marquez la tâche comme complétée
            await axios.put(`${API_URL}/taches-ok/${task.id}/`, { ok });

            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
            // Gérer les erreurs de requête ici, par exemple, afficher un message d'erreur à l'utilisateur
        }
    };


    return (
        <Dialog open={onOpen} onClose={onClose}>
            <DialogTitle>Rapport </DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div>Nom de la tache: {taskData.name}</div>
                        {/* Ajoutez d'autres informations sur la tâche ici */}
                            <TechAvatar techs={assignations} />
                                <TextField
                                    label="Report"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={report.rapport_text}
                                    onChange={handleReportChange}
                                />
                        <FormControlLabel
                            control={<Switch checked={isCompleted} onChange={handleSwitchChange} />}
                            label="cocher comme accomplie"
                        />
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                            <Button onClick={onClose} disabled={loading}>
                                Annuler
                            </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

TaskDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.bool.isRequired, // Ajustez le type en fonction de vos besoins
    task: PropTypes.object.isRequired,
}

export default TaskDialog;
