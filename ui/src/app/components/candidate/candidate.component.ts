import { Component, OnInit, Input } from '@angular/core';

import { Candidate, Tools, MessageType, Vote } from '../../shared';

import { PollService, UserService } from '../../services';

@Component({
	selector: 'app-candidate',
	templateUrl: './candidate.component.html',
	styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

	@Input() candidate: Candidate;

	private myVote: number;

	constructor(private pollService: PollService,
		private userService: UserService) { }

	ngOnInit() {
		let foundVote = this.findMyVote();
		this.myVote = (foundVote) ? foundVote.vote : 50;
	}

	toggleEditing() {
		this.candidate.editing = !this.candidate.editing;
	}

	deleteCandidate() {
		this.pollService.send(Tools.messageWrapper(MessageType.deleteCandidate,
			{
				question_id: this.candidate.question_id,
				candidate_id: this.candidate.id 
			}));
	}

	updateCandidate() {
		this.pollService.send(Tools.messageWrapper(MessageType.updateCandidate,
			this.candidate));
		this.candidate.editing = false;
	}

	findMyVote(): Vote {
		if (this.candidate.votes) {
			return this.candidate.votes.find(v => v.user_id == this.userService.getUser().id);
		} else {
			return null;
		}

	}

	createOrUpdateVote() {
		this.pollService.send(Tools.messageWrapper(MessageType.createOrUpdateVote,
		{
			candidate_id: this.candidate.id,
			question_id: this.candidate.question_id,
			user_id: this.candidate.user_id,
			vote: this.myVote
		}));
	}
	deleteVote() {
		this.pollService.send(Tools.messageWrapper(MessageType.deleteVote,
		{
			candidate_id: this.candidate.id,
			question_id: this.candidate.question_id,
			user_id: this.candidate.user_id,
		}));
	}



}