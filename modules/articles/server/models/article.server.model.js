'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    required: 'Falta completar el número de acuerdo...'
  },
  sesion: {
    type: String,
    default: '',
    required: 'Falta completar el número de sesión...'
  },
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Falta describir brevemente el acuerdo...'
  },
  mayorSummary: {
    type: String,
    default: '',
    trim: true,
  },
  chiefSummary: {
    type: String,
    default: '',
    trim: true,
  },
  contributorSummary: {
    type: String,
    default: '',
    trim: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  department: {
    type: [{
      type: String,
      enum: ['Alcaldía Municipal', 'Archivo Central', 'Auditoría Interna', 'Bienes Inmuebles',
        'CECUDI', 'Contabilidad', 'Cuadrilla Municipal', 'Desarrollo y Control Urbano',
        'Escuela Municipal de Música', 'Gestión de Cobros', 'Hacienda Municipal', 'Igualdad de Género y Desarrollo',
        'Programación y Ejecución Presupuestaria', 'Proveeduría', 'Recursos Humanos', 'Secretaría del Concejo Municipal',
        'Servicios Informáticos', 'Servicios Jurídicos', 'Tesorería', 'Topografía'
        , 'Unidad Técnica de Gestión Ambiental']
    }],
    required: 'Falta seleccionar el departamento...'
  },
  sesionDate: {
    type: Date,
    required: 'Falta completar la fecha de sesión...',
  },
  firstDate: {
    type: Date,
    default: Date.now
  },
  lastDate: {
    type: Date,
    required: 'Falta completar la fecha de finiquito...'
  },
  state: {
    type: String,
    default: 'Pendiente'
  },
  file: {
    type: String,
    default: 'modules/users/acuerdo.pdf'
  }
});

mongoose.model('Article', ArticleSchema);
