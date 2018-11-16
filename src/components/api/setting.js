'use strict';

export default {
    baseApiUrl : 'http://localhost:3000',
    urlgetProject: '/api/projects',
    urlCreateContainer: '/api/attachments',
    urlPostSurveyImg: '/api/attachments/survey/upload',
    urlDelSurveyImg: '/api/attachments/survey/files',
    urlGetSurveyImg: '/api/attachments/survey/download',
    urlCreateSurvey: '/api/surveys',
    urlGetSurvey: '/api/surveys',
    urlGetSurveyWithProjectId: '/api/projects/<:projectid>/surveys',
    urlGetUser: '/api/staffs'
}