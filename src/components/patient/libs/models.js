/** @format */

export default {
  data() {
    return {
      modelAnamnesis: [
        {
          name: 'Complaints',
          title: 'Complaints',
          fields: [],
        },
        {
          name: 'medical_history',
          title: 'Medical history',
          fields: [],
        },
        {
          name: 'life_anamnesis',
          title: 'Life anamnesis',
          fields: [
            {
              name: 'Chronic_diseases',
              title: 'Chronic diseases',
              validator: ['req'],
              type: 'string',
            },
            {
              name: 'Injuries',
              title: 'Injuries',
              validator: ['req'],
              type: 'string',
            },
            {
              name: 'Operations',
              title: 'Operations',
              validator: ['req'],
              type: 'string',
            },
          ],
        },
        {
          name: 'allergic_anamnesis',
          title: 'Allergic anamnesis',
          fields: [
            {
              name: 'Allergies_medicinal',
              title: 'Allergies to medicinal substances',
              validator: ['req'],
              type: 'string',
            },
            {
              name: 'Food_allergy',
              title: 'Food allergy',
              validator: ['req'],
              type: 'string',
            },
            {
              name: 'Household_allergies',
              title: 'Household allergies',
              validator: ['req'],
              type: 'string',
            },
          ],
        },
        { name: 'expert_anamnesis', title: 'expert Anamnesis', fields: [] },
        { name: 'objective_history', title: 'objective history', fields: [] },
        { name: 'general_history', title: 'general history', fields: [] },
        { name: 'local_history', title: 'local history', fields: [] },
      ],
      modelDiagnosis: [
        {
          name: 'diagnosis',
          title: 'Diagnosis',
          fields: [
            {
              name: 'code',
              title: 'code',
              validator: [],
              type: 'string',
            },
            {
              name: 'diagnos',
              title: 'Diagnosis',
              validator: ['req'],
              type: 'string',
            },
            {
              name: 'diagnos_comments',
              title: 'Diagnosis comments',
              validator: ['req'],
              type: 'string',
            },
          ],
        },
      ],
      modelSurveys: [
        {
          name: 'Laboratory_surveys',
          title: 'Laboratory surveys',
          fields: [
            {
              name: 'Laboratory_surveys_file',
              title: 'Прикрепленный файл',
              validator: [],
              type: 'filegroup',
              config: { multiple: true },
            },
          ],
        },
        {
          name: 'Hardware_surveys',
          title: 'Hardware and instrumental surveys',
          fields: [
            {
              name: 'Hardware_surveys_file',
              title: 'Прикрепленный файл',
              validator: [],
              type: 'filegroup',
              config: { multiple: true },
            },
          ],
        },
      ],

      modelAppointments: [
        {
          name: 'Appointments',
          title: 'Appointments',
          fields: [],
        },
      ],
      modelRecomendations: [
        {
          name: 'Recomendations',
          title: 'Recomendations',
          fields: [],
        },
      ],
      modelInfo: [
        {
          name: 'Info',
          title: 'information',
          fields: [
            {
              name: 'information',
              title: 'information',
              validator: [],
              type: '',
            },
            {
              name: 'sex',
              title: 'Пол',
              validator: [],
              options: ['male', 'female'],
              type: 'select',
            },
            {
              name: 'height',
              title: 'height',
              validator: [],
              type: 'number',
            },
            {
              name: 'weight',
              title: 'weight',
              validator: [],
              type: 'number',
            },
            {
              name: 'ad',
              title: 'ad',
              validator: [],
              type: 'string',
            },
            {
              name: 'hr',
              title: 'hr',
              validator: [],
              type: 'number',
            },
            {
              name: 'blood',
              title: 'blood',
              validator: [],
              options: ['I+', 'I-', 'II+', 'II-', 'III+', 'III-', 'IV+', 'IV-'],
              type: 'select',
            },
          ],
        },
      ],
    };
  },
};
