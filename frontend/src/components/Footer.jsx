import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return <>
    {completedTasksCount + activeTasksCount > 0 && (
      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          {
            completedTasksCount > 0 && (
              <>
                🎉 Awesome! You've completed {completedTasksCount} tasks
                {
                  activeTasksCount > 0 && `— only ${activeTasksCount} left. Keep it up! 🙌`
                }
              </>
            )
          }

          {completedTasksCount === 0 && activeTasksCount > 0 && (
            <>🚀 Let's get started! You've got {activeTasksCount} tasks waiting! 💪</>
          )}
        </p>
      </div>
    )}
  </>;
};

export default Footer