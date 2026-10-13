-- Apply manually to the configured PostgreSQL database before deploying the new API.
-- Existing rows are retained; this adds append-only, per-event research data.
CREATE TABLE IF NOT EXISTS research_events (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL REFERENCES alunos(id),
    sessao_id INTEGER NOT NULL REFERENCES jogador_sessoes(id),
    desafio_id INTEGER NOT NULL REFERENCES desafios(id),
    event_type VARCHAR(32) NOT NULL CHECK (event_type IN ('execution', 'feedback', 'hint_request', 'challenge_complete', 'challenge_failed', 'challenge_abandoned')),
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    execution_success BOOLEAN,
    correct_solution BOOLEAN,
    completion_time_ms INTEGER CHECK (completion_time_ms IS NULL OR completion_time_ms >= 0),
    score INTEGER CHECK (score IS NULL OR score BETWEEN 0 AND 100),
    tipo_erro_id INTEGER REFERENCES tipos_erro(id),
    tipo_feedback_id INTEGER REFERENCES tipos_feedback(id),
    feedback_text TEXT,
    hint_key VARCHAR(64)
);

CREATE INDEX IF NOT EXISTS research_events_student_session_time_idx
    ON research_events (aluno_id, sessao_id, occurred_at);
CREATE INDEX IF NOT EXISTS research_events_challenge_time_idx
    ON research_events (desafio_id, occurred_at);
