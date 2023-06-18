// PURPOSE: HELPER FUNCTIONS FOR HANDLEBARS
module.exports = {
  format_date: (date) => {
    // MM/DD/YYYY DATE FORMAT
    return date.toLocaleDateString();
  },

  format_amount: (amount) => {
    // FORMAT LARGE NUMBERS WITH COMMAS
    return parseInt(amount).toLocaleString();
  },

  is_my_page: (pageUser, userId) => {
    return pageUser === userId;
  },
};
