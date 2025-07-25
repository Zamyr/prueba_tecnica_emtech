import jsPDF from 'jspdf';
import { Student, CourseRecommendation } from '@/types';

interface PDFReportData {
  student: Student;
  score: number;
  percentage: number;
  totalQuestions: number;
  correctAnswers: number;
  timeElapsed: number;
  recommendations: CourseRecommendation[];
  completedAt: string;
}

export const generatePDFReport = (data: PDFReportData): Promise<Blob> => {
  return new Promise((resolve) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Configuración de colores
    const primaryColor = [59, 130, 246]; // blue-600
    const textColor = [31, 41, 55]; // gray-800
    const grayColor = [107, 114, 128]; // gray-500

    // Función helper para agregar texto
    const addText = (text: string, x: number, y: number, options: {
      fontSize?: number;
      color?: number[];
      align?: 'left' | 'center' | 'right';
      fontStyle?: 'normal' | 'bold';
    } = {}) => {
      const {
        fontSize = 12,
        color = textColor,
        align = 'left',
        fontStyle = 'normal'
      } = options;

      pdf.setFontSize(fontSize);
      pdf.setTextColor(color[0], color[1], color[2]);
      pdf.setFont('helvetica', fontStyle);
      pdf.text(text, x, y, { align });
    };

    // Función para agregar línea separadora
    const addLine = (y: number) => {
      pdf.setDrawColor(229, 231, 235); // gray-200
      pdf.line(20, y, pageWidth - 20, y);
    };

    // Header con logo y título
    addText('EduTech Academy', 20, yPosition, { 
      fontSize: 20, 
      color: primaryColor, 
      fontStyle: 'bold' 
    });
    
    yPosition += 10;
    addText('Reporte de Evaluación de Habilidades', 20, yPosition, { 
      fontSize: 16, 
      fontStyle: 'bold' 
    });

    yPosition += 15;
    addLine(yPosition);
    yPosition += 15;

    // Información del estudiante
    addText('INFORMACIÓN DEL ESTUDIANTE', 20, yPosition, { 
      fontSize: 14, 
      fontStyle: 'bold',
      color: primaryColor 
    });
    yPosition += 10;

    addText(`Nombre: ${data.student.name}`, 20, yPosition);
    yPosition += 8;
    addText(`Email: ${data.student.email}`, 20, yPosition);
    yPosition += 8;
    addText(`Edad: ${data.student.age} años`, 20, yPosition);
    yPosition += 8;
    addText(`Nivel Educativo: ${data.student.educationLevel}`, 20, yPosition);
    yPosition += 8;
    addText(`Fecha de Evaluación: ${new Date(data.completedAt).toLocaleDateString('es-ES')}`, 20, yPosition);
    
    yPosition += 20;
    addLine(yPosition);
    yPosition += 15;

    // Resultados del assessment
    addText('RESULTADOS DEL ASSESSMENT', 20, yPosition, { 
      fontSize: 14, 
      fontStyle: 'bold',
      color: primaryColor 
    });
    yPosition += 15;

    // Crear un cuadro para los resultados principales
    pdf.setFillColor(248, 250, 252); // gray-50
    pdf.rect(20, yPosition - 5, pageWidth - 40, 40, 'F');
    
    // Puntuación principal
    addText(`${data.percentage}%`, pageWidth / 2, yPosition + 10, { 
      fontSize: 24, 
      fontStyle: 'bold',
      color: data.percentage >= 70 ? [34, 197, 94] : data.percentage >= 40 ? [59, 130, 246] : [239, 68, 68],
      align: 'center'
    });
    
    addText('PUNTUACIÓN FINAL', pageWidth / 2, yPosition + 20, { 
      fontSize: 10,
      color: grayColor,
      align: 'center'
    });

    yPosition += 50;

    // Estadísticas detalladas
    const stats = [
      { label: 'Preguntas Respondidas', value: data.totalQuestions.toString() },
      { label: 'Respuestas Correctas', value: data.correctAnswers.toString() },
      { label: 'Tiempo Total', value: `${Math.floor(data.timeElapsed / 60)} min ${data.timeElapsed % 60} seg` },
      { label: 'Nivel de Rendimiento', value: data.percentage >= 70 ? 'Excelente' : data.percentage >= 40 ? 'Bueno' : 'Necesita Mejorar' }
    ];

    stats.forEach((stat, index) => {
      const xPos = 20 + (index % 2) * (pageWidth / 2 - 20);
      const yPos = yPosition + Math.floor(index / 2) * 15;
      
      addText(`${stat.label}:`, xPos, yPos, { fontStyle: 'bold' });
      addText(stat.value, xPos + 60, yPos);
    });

    yPosition += 40;
    addLine(yPosition);
    yPosition += 15;

    // Recomendaciones de cursos
    addText('CURSOS RECOMENDADOS', 20, yPosition, { 
      fontSize: 14, 
      fontStyle: 'bold',
      color: primaryColor 
    });
    yPosition += 15;

    data.recommendations.slice(0, 3).forEach((rec, index) => {
      // Verificar si necesitamos una nueva página
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      // Número de prioridad
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.circle(25, yPosition + 5, 4, 'F');
      addText((index + 1).toString(), 25, yPosition + 7, { 
        color: [255, 255, 255], 
        fontStyle: 'bold',
        align: 'center'
      });

      // Información del curso
      addText(rec.course.title, 35, yPosition + 5, { 
        fontSize: 12, 
        fontStyle: 'bold' 
      });
      
      yPosition += 10;
      addText(`Nivel: ${rec.course.level} | Duración: ${rec.course.duration}`, 35, yPosition, {
        fontSize: 10,
        color: grayColor
      });
      
      yPosition += 8;
      const maxWidth = pageWidth - 55;
      const splitDescription = pdf.splitTextToSize(rec.course.description, maxWidth);
      pdf.text(splitDescription, 35, yPosition);
      yPosition += splitDescription.length * 5;
      
      yPosition += 5;
      const splitReason = pdf.splitTextToSize(`💡 ${rec.reason}`, maxWidth);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text(splitReason, 35, yPosition);
      yPosition += splitReason.length * 5;
      
      yPosition += 10;
    });

    // Próximos pasos
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    yPosition += 10;
    addLine(yPosition);
    yPosition += 15;

    addText('PRÓXIMOS PASOS RECOMENDADOS', 20, yPosition, { 
      fontSize: 14, 
      fontStyle: 'bold',
      color: primaryColor 
    });
    yPosition += 15;

    const nextSteps = [
      'Revisa tus resultados y las áreas de mejora identificadas',
      'Comienza con el primer curso recomendado',
      'Dedica tiempo regular al estudio (2-3 horas por día)',
      'Practica con proyectos reales mientras estudias',
      'No dudes en contactar a nuestros instructores si necesitas ayuda'
    ];

    nextSteps.forEach((step) => {
      addText('✓', 25, yPosition, { color: [34, 197, 94] });
      const maxWidth = pageWidth - 50;
      const splitStep = pdf.splitTextToSize(step, maxWidth);
      pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
      pdf.text(splitStep, 35, yPosition);
      yPosition += splitStep.length * 5 + 3;
    });

    // Footer
    yPosition = pageHeight - 30;
    addLine(yPosition);
    yPosition += 10;
    addText('¡Gracias por usar EduTech Academy!', pageWidth / 2, yPosition, { 
      align: 'center',
      color: grayColor 
    });
    addText('Para más información, visita nuestro sitio web.', pageWidth / 2, yPosition + 8, { 
      fontSize: 10,
      align: 'center',
      color: grayColor 
    });

    // Convertir PDF a Blob
    const pdfBlob = pdf.output('blob');
    resolve(pdfBlob);
  });
};

export const downloadPDFReport = async (data: PDFReportData) => {
  try {
    const pdfBlob = await generatePDFReport(data);
    
    // Crear URL del blob y descargar
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte-assessment-${data.student.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    throw new Error('Error al generar el reporte PDF');
  }
};
