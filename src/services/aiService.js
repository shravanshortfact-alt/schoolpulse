// Local Smart AI Assistance Service for SchoolPulse Demo
export const aiService = {
  // Feature 1: Generate Student Insights Summary
  generateStudentSummary(student) {
    const name = student?.name || 'Aman Sharma';
    const att = student?.attendancePct || 87;
    const hw = student?.homeworkPct || 78;

    if (att < 90 && hw < 80) {
      return `${name} has shown a mild decrease in attendance (${att}%) and homework completion (${hw}%) over the past two weeks. Consider checking in with the student and parent to provide supportive guidance in Mathematics.`;
    } else if (att >= 95) {
      return `${name} maintains exemplary attendance (${att}%) and solid engagement (${hw}% homework completed). Continuous positive encouragement will help sustain high academic momentum.`;
    } else {
      return `${name} is demonstrating steady participation with ${att}% attendance. Homework completion is at ${hw}%. A brief 5-minute review of upcoming deadlines is recommended.`;
    }
  },

  // Feature 2: Summarize Parent Conversation into 2-3 bullet points
  summarizeParentConversation(voiceMessages = []) {
    if (!voiceMessages || voiceMessages.length === 0) {
      return [
        'Initial voice update transmitted regarding Mathematics homework.',
        'Awaiting parent acknowledgement & home review schedule.'
      ];
    }
    const latest = voiceMessages[0];
    return [
      `Teacher notified parent regarding ${latest.subject}.`,
      `Parent (${latest.parentName}) viewed audio message and confirmed acknowledgment.`,
      latest.parentReply ? `Parent note: "${latest.parentReply}"` : 'Parent promised home revision support for upcoming topics.'
    ];
  },

  // Feature 3: Draft Parent Message from key prompt
  draftParentMessage(promptText, studentName = 'Aman', parentName = 'Mr. Sharma') {
    const lower = promptText.toLowerCase();
    
    if (lower.includes('homework') || lower.includes('incomplete') || lower.includes('3 days')) {
      return `Dear ${parentName}, I hope you are doing well. I wanted to share that ${studentName} hasn't completed his last few Mathematics assignments. We would love your support in helping him complete them at home so he feels confident for the upcoming mid-terms. Please let me know if you have any questions!`;
    } else if (lower.includes('absent') || lower.includes('attendance')) {
      return `Dear ${parentName}, ${studentName} was missed in class today. We hope everything is alright. Please feel free to reach out if ${studentName} needs any assistance catching up on missed class materials.`;
    } else if (lower.includes('praise') || lower.includes('good') || lower.includes('improvement')) {
      return `Dear ${parentName}, I am pleased to let you know that ${studentName} did a fantastic job during class discussions today! Thank you for encouraging his effort at home.`;
    } else {
      return `Dear ${parentName}, sharing a brief update regarding ${studentName}'s overall learning progress in Class 12-A. ${studentName} is participating well, and with a little extra practice at home, he will excel further. Thank you for your continued support!`;
    }
  }
};
