import TeamDisplay from './TeamDisplay';
import { directors, channelTeamMembers } from '../data/teamMembers';
import styles from './TeamSection.module.css';

export default function TeamSection() {
  return (
    <section className={styles.sectionWrapper}>
      <TeamDisplay 
        title="DIRECTORS" 
        subtitle="Leadership shaping the vision and growth"
        members={directors}
        variant="directors"
      />
      
      <div className={styles.dividerWrapper}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerDiamond}></div>
        <div className={styles.dividerLine}></div>
      </div>

      <TeamDisplay 
        title="CHANNEL TEAM MEMBERS" 
        subtitle="Meet the team behind our partnerships."
        members={channelTeamMembers}
        variant="channel"
      />
    </section>
  );
}
